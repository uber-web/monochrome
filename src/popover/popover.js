/* global setTimeout, clearTimeout, document */
import React from 'react';
import PropTypes from 'prop-types';
import {Portal} from 'react-portal';
import Popper from 'popper.js';

import {POSITIONS, THEMES, TRIGGERS} from './constants';
import {
  capitalize,
  getOppositePosition,
  nodeHasParent,
  positionsToPopperPlacement
} from './utils';

const isBrowser =
  typeof document !== 'undefined' && Boolean(document.createElement);

const defaultDarkBodyStyles = {
  color: '#f1f1f1',
  backgroundColor: '#000',
  borderColor: '#000'
};

const defaultLightBodyStyles = {
  backgroundColor: '#fff',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#ddd',
  boxShadow: '0 2px 7px 0 rgba(0,0,0,0.15)'
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
    arrowPosition: POSITIONS_PROP_TYPE,
    arrowSize: PropTypes.number,
    bodyStyle: PropTypes.object,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    onMouseOutDelay: PropTypes.number,
    position: POSITIONS_PROP_TYPE,
    // Support injecting mock Popper class for tests
    popperClass: PropTypes.func,
    // Support injecting mock Portal class for tests
    portalClass: PropTypes.func,
    showArrow: PropTypes.bool,
    style: PropTypes.object,
    theme: PropTypes.oneOf([THEMES.LIGHT, THEMES.DARK]),
    trigger: PropTypes.oneOf([TRIGGERS.HOVER, TRIGGERS.CLICK])
  };

  static defaultProps = {
    arrowSize: 8,
    onMouseOutDelay: 0,
    popperClass: Popper,
    portalClass: Portal,
    showArrow: true,
    // Default wrapper style should ideally be display: inline so that popover
    // shows directly beneath child content, inline-flex just generally works
    // better than inline
    style: {display: 'inline-flex'},
    theme: THEMES.LIGHT,
    trigger: TRIGGERS.CLICK
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

  _getBodyStyle() {
    const {bodyStyle, theme} = this.props;

    const defaultStyles =
      theme === THEMES.LIGHT ? defaultLightBodyStyles : defaultDarkBodyStyles;

    if (bodyStyle) {
      return {...defaultStyles, ...bodyStyle};
    }
    return defaultStyles;
  }

  /**
   * Some of this logic for generating arrows may seem rather complicated.
   * Normally Popper.js has an accompanying css file with some of the necessary
   * rules, but in the interest of having zero css dependencies, we'll move
   * this styling/positioning logic into js
   */
  _generateTriangleStyles(position, size, color) {
    // Generate borderWidth & borderColor rules
    const positionIndexes = [
      POSITIONS.TOP,
      POSITIONS.RIGHT,
      POSITIONS.BOTTOM,
      POSITIONS.LEFT
    ];
    const borderWidth = Array(4).fill(`${size}px`);
    const borderColor = Array(4).fill('transparent');

    // Set border width to zero for opposite position
    const oppositePosition = getOppositePosition(position);
    borderWidth[positionIndexes.indexOf(oppositePosition)] = '0';

    // Set border color for index of specified position
    borderColor[positionIndexes.indexOf(position)] = color;

    return {
      borderWidth: borderWidth.join(' '),
      borderColor: borderColor.join(' '),
      // Position the arrow to hang off the edge of the popover
      // For example, a left-facing arrow would need the rule right: -{size}px
      [oppositePosition]: `${-size}px`
    };
  }

  /**
   * We create our arrow triangle using css borders, however this makes it
   * difficult for us to add an actual border effect to the triangle. In order
   * to achieve this effect, we generate two arrows and overlap them–an outer
   * arrow with the border color, and an inner arrow with the background color.
   */
  _generateOuterArrowStyles(position) {
    const {arrowSize, theme} = this.props;
    const {popperOffsets = {}} = this.state;
    const arrowOffsets = popperOffsets.arrow || {};
    const borderColor =
      theme === THEMES.LIGHT
        ? defaultLightBodyStyles.borderColor
        : defaultDarkBodyStyles.borderColor;
    const isVertical =
      position === POSITIONS.TOP || position === POSITIONS.BOTTOM;

    const style = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      margin: `${arrowSize}px`,
      ...this._generateTriangleStyles(position, arrowSize, borderColor)
    };

    // Default arrow to be centered
    if (isVertical) {
      style.left = `calc(50% - ${arrowSize}px)`;
      style.marginTop = 0;
      style.marginBottom = 0;
    } else {
      style.top = `calc(50% - ${arrowSize}px)`;
      style.marginLeft = 0;
      style.marginRight = 0;
    }

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
    const {arrowSize, theme} = this.props;
    const arrowColor = theme === THEMES.LIGHT ? '#fff' : '#000';
    const isVertical =
      position === POSITIONS.TOP || position === POSITIONS.BOTTOM;

    const style = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    };

    // Add the necessary border rules to make it a triangle
    const innerTriangleRules = this._generateTriangleStyles(
      position,
      arrowSize,
      arrowColor
    );
    style.borderWidth = innerTriangleRules.borderWidth;
    style.borderColor = innerTriangleRules.borderColor;

    // Offset the inner arrow a couple pixels from its parent (the outer arrow)
    if (isVertical) {
      style.left = `-${arrowSize}px`;
      style.top = position === POSITIONS.TOP ? `-${arrowSize + 2}px` : '2px';
    } else {
      style.top = `-${arrowSize}px`;
      style.left = position === POSITIONS.LEFT ? `-${arrowSize + 2}px` : '2px';
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
        className="u-popover-target"
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
        className="u-popover-arrow"
        style={this._generateOuterArrowStyles(position)}
        ref={el => {
          this.$arrow = el;
        }}
      >
        <div style={this._generateInnerArrowStyles(position)} />
      </div>
    );
  }

  _renderBody() {
    const {arrowSize, showArrow, trigger} = this.props;
    const {popperStyles = {}} = this.state;

    const [position] = this.state.popperPlacement.split('-');
    const popperStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 999,
      ...popperStyles
    };

    if (position && position !== POSITIONS.AUTO && showArrow) {
      popperStyle[
        `margin${capitalize(getOppositePosition(position))}`
      ] = `${arrowSize}px`;
    }

    const interactionProps = {};
    if (trigger === TRIGGERS.HOVER) {
      interactionProps.onMouseEnter = this._handlePopoverMouseEnter;
      interactionProps.onMouseLeave = this._handlePopoverMouseLeave;
    }

    const PortalClass = this.props.portalClass;
    return (
      <PortalClass>
        <div
          {...interactionProps}
          ref={el => {
            this.$popper = el;
          }}
          style={popperStyle}
        >
          {this._renderContent()}
          {showArrow && this._renderArrow(position)}
        </div>
      </PortalClass>
    );
  }

  _renderContent() {
    const content =
      typeof this.props.content === 'function'
        ? this.props.content()
        : this.props.content;
    return (
      <div className="u-popover-body" style={this._getBodyStyle()}>
        {content}
      </div>
    );
  }

  render() {
    const {style} = this.props;
    const {isVisible} = this.state;
    return (
      <div className="u-popover-wrapper" style={style}>
        {this._renderTarget()}
        {isVisible && this._renderBody()}
      </div>
    );
  }
}

export default Popover;
