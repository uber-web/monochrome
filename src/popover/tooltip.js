/**
 * Tooltip is just a Popover with some style overrides
 */
import React from 'react';
import PropTypes from 'prop-types';
import Popover from './popover';
import {POSITIONS, SIZES, THEMES, TRIGGERS} from './constants';

const sizes = {
  [SIZES.NONE]: 'none',
  [SIZES.SMALL]: '150px',
  [SIZES.MEDIUM]: '300px',
  [SIZES.LARGE]: '500px'
};

const defaultTooltipBodyStyles = {
  textAlign: 'left',
  padding: '10px',
  fontSize: '12px',
  lineHeight: 1.6,
  fontWeight: 'normal',
  textTransform: 'none'
};

const POSITIONS_PROP_TYPE = PropTypes.oneOf([
  POSITIONS.TOP,
  POSITIONS.RIGHT,
  POSITIONS.BOTTOM,
  POSITIONS.LEFT,
  POSITIONS.AUTO
]);

class Tooltip extends React.Component {
  static propTypes = {
    arrowPosition: POSITIONS_PROP_TYPE,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    horizontalSize: PropTypes.oneOf([
      SIZES.SMALL,
      SIZES.MEDIUM,
      SIZES.LARGE,
      SIZES.NONE
    ]),
    onMouseOutDelay: PropTypes.number,
    position: POSITIONS_PROP_TYPE,
    tooltipStyle: PropTypes.object,
    style: PropTypes.object,
    theme: PropTypes.oneOf([THEMES.LIGHT, THEMES.DARK])
  };

  static defaultProps = {
    theme: THEMES.DARK,
    horizontalSize: SIZES.MEDIUM,
    position: POSITIONS.TOP
  };

  _getWidth() {
    const {horizontalSize} = this.props;
    return sizes[horizontalSize];
  }

  _getStyle() {
    const {tooltipStyle = {}} = this.props;
    return {
      ...defaultTooltipBodyStyles,
      // Only use our maxWidth if user isn't overriding width
      ...(tooltipStyle.width ? {} : {maxWidth: this._getWidth()}),
      ...tooltipStyle
    };
  }

  render() {
    return (
      <Popover
        arrowPosition={this.props.arrowPosition}
        bodyStyle={this._getStyle()}
        content={this.props.content}
        onMouseOutDelay={this.props.onMouseOutDelay}
        position={this.props.position}
        style={this.props.style}
        theme={this.props.theme}
        trigger={TRIGGERS.HOVER}
      >
        {this.props.children}
      </Popover>
    );
  }
}

export default Tooltip;
