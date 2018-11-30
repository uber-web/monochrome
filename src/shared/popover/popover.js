/* global setTimeout, clearTimeout, document */
import React from 'react';
import PropTypes from 'prop-types';
import Popper from 'popper.js';

import styled from '@emotion/styled';
import {withTheme, evaluateStyle} from '../theme';

import {
  capitalize,
  getOppositePosition,
  generateTriangleStyles,
  nodeHasParent,
  positionsToPopperPlacement
} from './utils';

const isBrowser =
  typeof document !== 'undefined' && Boolean(document.createElement);

export const POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  AUTO: 'auto'
};

export const TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover'
};

const PopoverComponent = styled.div(props => ({
  /* Default wrapper style should ideally be display: inline so that popover
  shows directly beneath child content, inline-flex just generally works
  better than inline */
  display: 'inline-flex',
  ...evaluateStyle(props.userStyle, props)
}));

const PopoverTarget = styled.div(props => ({
  ...evaluateStyle(props.userStyle, props)
}));

const PopoverContent = styled.div(props => ({  
  ...evaluateStyle(props.userStyle, props)
}));

const PopoverBody = styled.div(props => {
  let style = null;
  if (props.position && props.position !== POSITIONS.AUTO && props.arrowSize) {
    style = {
      [`margin${capitalize(getOppositePosition(props.position))}`]: props.arrowSize
    };
  }

  return {
    ...style,

    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    background: props.theme.background,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: props.theme.controlColorPrimary,
    boxShadow: props.theme.shadow,

    ...props.popperStyles,
    ...evaluateStyle(props.userStyle, props)
  };
});

const OuterArrow = styled.div(props => {
  /**
   * We create our arrow triangle using css borders, however this makes it
   * difficult for us to add an actual border effect to the triangle. In order
   * to achieve this effect, we generate two arrows and overlap them–an outer
   * arrow with the border color, and an inner arrow with the background color.
   */
 
  const {position, arrowSize, popperOffsets} = props;
  const arrowOffsets = popperOffsets.arrow || {};

  const style = {
    borderColor: props.theme.controlColorPrimary,
    ...generateTriangleStyles(position, arrowSize),
    // Position the arrow to hang off the edge of the popover
    // For example, a left-facing arrow would need the rule right: -{size}px
    [getOppositePosition(position)]: -arrowSize
  };

  // Now apply arrow offsets calculated by popper library (if needed)
  if (arrowOffsets.top) {
    style.top = arrowOffsets.top;
  }
  if (arrowOffsets.left) {
    style.left = arrowOffsets.left;
  }

  return Object.assign(style, evaluateStyle(props.userStyle, props));
});

const InnerArrow = styled.div(props => {
  const {position, arrowSize} = props;
  const isVertical =
    position === POSITIONS.TOP || position === POSITIONS.BOTTOM;

  const style = {
    borderColor: props.theme.background,
    ...generateTriangleStyles(position, arrowSize)
  };

  // Offset the inner arrow a couple pixels from its parent (the outer arrow)
  if (isVertical) {
    style.left = -arrowSize;
    style.top = position === POSITIONS.TOP ? -arrowSize : 0;
    style.marginTop = position === POSITIONS.TOP ? -1 : 1;
  } else {
    style.top = -arrowSize;
    style.left = position === POSITIONS.LEFT ? -arrowSize : 0;
    style.marginLeft = position === POSITIONS.LEFT ? -1 : 1;
  }

  return Object.assign(style, evaluateStyle(props.userStyle, props));
});

const POSITIONS_PROP_TYPE = PropTypes.oneOf([
  POSITIONS.TOP,
  POSITIONS.RIGHT,
  POSITIONS.BOTTOM,
  POSITIONS.LEFT,
  POSITIONS.AUTO
]);

class Popover extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    position: POSITIONS_PROP_TYPE,
    // Arrow options
    showArrow: PropTypes.bool,
    arrowSize: PropTypes.number,
    arrowPosition: POSITIONS_PROP_TYPE,
    // Interaction
    onMouseOutDelay: PropTypes.number,
    trigger: PropTypes.oneOf([TRIGGERS.HOVER, TRIGGERS.CLICK]),
    // Support injecting mock Popper class for tests
    popperClass: PropTypes.func
  };

  static defaultProps = {
    className: '',
    style: {},
    showArrow: true,
    arrowSize: 6,
    trigger: TRIGGERS.CLICK,
    onMouseOutDelay: 0,
    popperClass: Popper
  };

  constructor(props) {
    super(props);
    this.state = this._getDefaultState(props);
  }

  componentDidUpdate(prevProps, prevState) {
    // If we just switched to showing popover, create a new Popper for positioning
    if (this.state.isVisible && !prevState.isVisible) {
      const PopperClass = this.props.popperClass;
      this.popper = new PopperClass(this.$target, this.$popper, {
        placement: this.state.popperPlacement,
        modifiers: {
          // Passing the arrow ref will measure the arrow when calculating styles
          arrow: {
            element: this.$arrow,
            enabled: this.props.showArrow
          },
          // Disable default styling modifier, and use our custom react one instead
          applyStyle: {enabled: false},
          applyReactStyle: {
            enabled: true,
            fn: this._handlePopperUpdate,
            order: 900
          }
        }
      });

      if (this.props.trigger === TRIGGERS.CLICK) {
        this._addClickEvents();
      }
    }
  }

  componentWillUnmount() {
    this._destroyPopover();
    this._removeClickEvents();
  }

  _getDefaultState(props) {
    return {
      isVisible: false,
      popperOffsets: {},
      popperPlacement: positionsToPopperPlacement(
        props.position,
        props.arrowPosition
      ),
      popperStyles: {}
    };
  }

  _handleTargetClick = () => {
    this._togglePopover();
  };

  _handleTargetMouseEnter = () => {
    // If onMouseOutDelay is set and mouse is moving from popper back to target,
    // we want to cancel any timers that would cause it to hide unexpectedly
    clearTimeout(this.hideTimer);

    this._showPopover();
  };

  _handleTargetMouseLeave = () => {
    this._hidePopoverWithDelay();
  };

  _handlePopoverMouseEnter = () => {
    clearTimeout(this.hideTimer);
  };

  _handlePopoverMouseLeave = () => {
    this._hidePopoverWithDelay();
  };

  _handleKeyPress = evt => {
    if (evt.key === 'Escape') {
      this._hidePopover();
    }
  };

  _handlePopperUpdate = data => {
    this.setState({
      popperOffsets: data.offsets,
      popperPlacement: data.placement,
      popperStyles: data.styles
    });
    return data;
  };

  _showPopover() {
    console.log('showing popover');
    this.setState({isVisible: true});
  }

  _hidePopover = () => {
    this.setState(this._getDefaultState(this.props));
    this._destroyPopover();
  };

  _hidePopoverWithDelay() {
    const {onMouseOutDelay} = this.props;
    if (onMouseOutDelay) {
      this.hideTimer = setTimeout(this._hidePopover, onMouseOutDelay);
      return;
    }
    this._hidePopover();
  }

  _addClickEvents() {
    if (!isBrowser) {
      return;
    }
    document.addEventListener('mousedown', this._handleDocumentClick);
    document.addEventListener('keyup', this._handleKeyPress);
  }

  _removeClickEvents() {
    if (!isBrowser) {
      return;
    }
    document.removeEventListener('mousedown', this._handleDocumentClick);
    document.removeEventListener('keyup', this._handleKeyPress);
  }

  _handleDocumentClick = evt => {
    if (
      !this.$popper ||
      nodeHasParent(evt.target, this.$popper) ||
      nodeHasParent(evt.target, this.$target)
    ) {
      return;
    }
    this._hidePopover();
  };

  _togglePopover() {
    const isVisible = !this.state.isVisible;
    this.setState({isVisible});
    if (!isVisible) {
      this._destroyPopover();
    }
  }

  _destroyPopover() {
    if (this.popper) {
      this.popper.destroy();
      delete this.popper;
    }
    if (this.props.trigger === TRIGGERS.CLICK) {
      this._removeClickEvents();
    }
  }

  _renderTarget(styleProps) {
    const {trigger, style} = this.props;

    const interactionProps = {};
    if (trigger === TRIGGERS.HOVER) {
      interactionProps.onMouseEnter = this._handleTargetMouseEnter;
      interactionProps.onMouseLeave = this._handleTargetMouseLeave;
    } else if (trigger === TRIGGERS.CLICK) {
      interactionProps.onClick = this._handleTargetClick;
    }

    return (
      <PopoverTarget
        {...interactionProps}
        userStyle={style.target}
        {...styleProps}
        ref={el => {
          this.$target = el;
        }}
      >
        {this.props.children}
      </PopoverTarget>
    );
  }

  _renderArrow(styleProps) {
    const {style} = this.props;
    const {arrowPosition} = styleProps;

    return (
      <OuterArrow
        userStyle={style.arrowBorder}
        {...styleProps}
        ref={el => {
          this.$arrow = el;
        }}
      >
        <InnerArrow userStyle={style.arrow} {...styleProps}/>
      </OuterArrow>
    );
  }

  _renderBody(styleProps) {
    const {className, style, showArrow, trigger} = this.props;

    const interactionProps = {};
    if (trigger === TRIGGERS.HOVER) {
      interactionProps.onMouseEnter = this._handlePopoverMouseEnter;
      interactionProps.onMouseLeave = this._handlePopoverMouseLeave;
    }

    return (
      <PopoverBody className={className}
        {...interactionProps}
        userStyle={style.body}
        {...styleProps}
        ref={el => {
          this.$popper = el;
        }}
      >
        {this._renderContent(styleProps)}
        {showArrow && this._renderArrow(styleProps)}
      </PopoverBody>
    );
  }

  _renderContent(styleProps) {
    const content =
      typeof this.props.content === 'function'
        ? this.props.content()
        : this.props.content;
    return (
      <PopoverContent userStyle={this.props.style.content} {...styleProps}>
        {content}
      </PopoverContent>
    );
  }

  render() {
    const {theme, style, showArrow, arrowSize} = this.props;
    const {isVisible, popperPlacement, popperStyles, popperOffsets} = this.state;

    const [position] = popperPlacement.split('-');
    const arrowPosition = position === POSITIONS.AUTO ? POSITIONS.TOP : position;

    const styleProps = {
      theme,
      arrowSize: showArrow ? arrowSize : 0,
      position,
      arrowPosition,
      popperStyles,
      popperOffsets,
      isActive: isVisible
    };
    return (
      <PopoverComponent userStyle={style.popover} {...styleProps}>
        {this._renderTarget(styleProps)}
        {isVisible && this._renderBody(styleProps)}
      </PopoverComponent>
    );
  }
}

const ThemedPopover = withTheme(Popover);

Object.assign(ThemedPopover, POSITIONS);
Object.assign(ThemedPopover, TRIGGERS);

export default ThemedPopover;
