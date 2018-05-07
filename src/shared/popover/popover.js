/* global setTimeout, clearTimeout, document */
import React from 'react';
import PropTypes from 'prop-types';
import Popper from 'popper.js';

import {
  capitalize,
  getOppositePosition,
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

  /**
   * Some of this logic for generating arrows may seem rather complicated.
   * Normally Popper.js has an accompanying css file with some of the necessary
   * rules, but in the interest of having zero css dependencies, we'll move
   * this styling/positioning logic into js
   */
  _generateTriangleStyles(position, size) {
    // Generate borderWidth & borderColor rules
    const positions = [
      POSITIONS.TOP,
      POSITIONS.RIGHT,
      POSITIONS.BOTTOM,
      POSITIONS.LEFT
    ];
    // Set border width to zero for opposite position
    const oppositePosition = getOppositePosition(position);
    const style = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    };

    for (const p of positions) {
      const key = capitalize(p);
      const width = p === oppositePosition ? 0 : size;
      const color = p === position ? undefined : 'transparent';
      style[`border${key}Width`] = width;
      style[`border${key}Color`] = color;
    }

    return style;
  }

  /**
   * We create our arrow triangle using css borders, however this makes it
   * difficult for us to add an actual border effect to the triangle. In order
   * to achieve this effect, we generate two arrows and overlap them–an outer
   * arrow with the border color, and an inner arrow with the background color.
   */
  _generateOuterArrowStyles(position) {
    const {arrowSize} = this.props;
    const {popperOffsets = {}} = this.state;
    const arrowOffsets = popperOffsets.arrow || {};

    const style = {
      ...this._generateTriangleStyles(position, arrowSize),
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

    return style;
  }

  _generateInnerArrowStyles(position) {
    const {arrowSize} = this.props;
    const isVertical =
      position === POSITIONS.TOP || position === POSITIONS.BOTTOM;

    const style = this._generateTriangleStyles(position, arrowSize);

    // Offset the inner arrow a couple pixels from its parent (the outer arrow)
    if (isVertical) {
      style.left = -arrowSize;
      style.top = position === POSITIONS.TOP ? -arrowSize : 0;
    } else {
      style.top = -arrowSize;
      style.left = position === POSITIONS.LEFT ? -arrowSize : 0;
    }

    return style;
  }

  _renderTarget() {
    const {trigger} = this.props;

    const interactionProps = {};
    if (trigger === TRIGGERS.HOVER) {
      interactionProps.onMouseEnter = this._handleTargetMouseEnter;
      interactionProps.onMouseLeave = this._handleTargetMouseLeave;
    } else if (trigger === TRIGGERS.CLICK) {
      interactionProps.onClick = this._handleTargetClick;
    }

    return (
      <div
        {...interactionProps}
        ref={el => {
          this.$target = el;
        }}
        className="mc-popover--target"
      >
        {this.props.children}
      </div>
    );
  }

  _renderArrow(position) {
    // If position is auto, just default to top for rendering arrow
    if (position === POSITIONS.AUTO) {
      position = POSITIONS.TOP;
    }


    return (
      <div
        className={`mc-popover--arrow-border ${position}`}
        style={this._generateOuterArrowStyles(position)}
        ref={el => {
          this.$arrow = el;
        }}
      >
        <div className={`mc-popover--arrow ${position}`}
          style={this._generateInnerArrowStyles(position)} />
      </div>
    );
  }

  _renderBody() {
    const {className, arrowSize, showArrow, trigger} = this.props;
    const {popperStyles = {}} = this.state;

    const [position] = this.state.popperPlacement.split('-');
    const popperStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 99,
      ...popperStyles
    };

    if (position && position !== POSITIONS.AUTO && showArrow) {
      popperStyle[
        `margin${capitalize(getOppositePosition(position))}`
      ] = arrowSize;
    }

    const interactionProps = {};
    if (trigger === TRIGGERS.HOVER) {
      interactionProps.onMouseEnter = this._handlePopoverMouseEnter;
      interactionProps.onMouseLeave = this._handlePopoverMouseLeave;
    }

    return (
      <div className={className}
        {...interactionProps}
        ref={el => {
          this.$popper = el;
        }}
        style={popperStyle}
      >
        {this._renderContent()}
        {showArrow && this._renderArrow(position)}
      </div>
    );
  }

  _renderContent() {
    const content =
      typeof this.props.content === 'function'
        ? this.props.content()
        : this.props.content;
    return (
      <div className="mc-popover--body" >
        {content}
      </div>
    );
  }

  render() {
    const {isVisible, style} = this.state;
    return (
      <div className="mc-popover" style={style}>
        {this._renderTarget()}
        {isVisible && this._renderBody()}
      </div>
    );
  }
}

Object.assign(Popover, POSITIONS);
Object.assign(Popover, TRIGGERS);

export default Popover;
