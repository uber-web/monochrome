import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Draggable from '../shared/draggable';

const STYLES = {
  content: {
    overflow: 'hidden',
    lineHeight: 0,
    boxSizing: 'content-box',
    position: 'relative'
  },
  resizer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
    cursor: 'nwse-resize'
  }
};

/**
 * @class
 */
export default class FloatPanel extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    // container
    parentWidth: PropTypes.number,
    parentHeight: PropTypes.number,
    // state
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    minimized: PropTypes.bool,
    // interactivity
    movable: PropTypes.bool,
    resizable: PropTypes.bool,
    minimizable: PropTypes.bool,
    // callbacks
    onUpdate: PropTypes.func
  };

  static defaultProps = {
    parentWidth: Infinity,
    parentHeight: Infinity,
    className: '',
    title: '',
    minimized: false,
    movable: true,
    resizable: false,
    minimizable: true,
    onUpdate: () => {}
  };

  /**
   * @constructor
   *
   * @property {string|Element} title content to display in the title bar.
   *  If empty, the title bar will be hidden.
   * @property {number} x position from the left in pixels
   * @property {number} y position from the top in pixels
   * @property {number} width width of the panel
   * @property {number} height height of the panel
   * @property {string} [className] additional class name for the container
   * @property {number} [parentWidth] width of the parent window
   * @property {number} [parentHeight]} height of the parent window
   *  If parent window size is specified, the panel cannot be moved outside of its bounds.
   * @property {boolean} [minimized] whether the panel is minimized (show only title bar)
   * @property {boolean} [movable] whether the panel can be moved, default true
   * @property {boolean} [resizable] whether the panel can be resized, default false
   * @property {boolean} [minimizable] whether the panel can be minimized, default true
   * @property {function} [onUpdate] callback when user move/resize/minimize the panel
   */
  constructor(props) {
    super(props);
    this.state = {
      startProps: null
    };
  }

  _onMoveStart = () => {
    const {x, y, width, height, minimized} = this.props;
    this.setState({
      startProps: {x, y, width, height, minimized}
    });
  };

  _onMoveDrag = ({deltaX, deltaY}) => {
    const {startProps} = this.state;
    this.props.onUpdate({
      ...startProps,
      x: Math.max(0, startProps.x + deltaX),
      y: Math.max(0, startProps.y + deltaY)
    });
  };

  _onMoveEnd = ({hasDragged}) => {
    if (this.props.minimizable && !hasDragged) {
      const {startProps} = this.state;
      this.props.onUpdate({
        ...startProps,
        minimized: !startProps.minimized
      });
    }
  };

  _onResizeStart = () => {
    const {x, y, width, height, minimized} = this.props;
    this.setState({
      startProps: {x, y, width, height, minimized}
    });
  };

  _onResizeDrag = ({deltaX, deltaY}) => {
    const {startProps} = this.state;
    this.props.onUpdate({
      ...startProps,
      width: Math.max(0, startProps.width + deltaX),
      height: Math.max(0, startProps.height + deltaY)
    });
  };

  renderMover(children) {
    const {movable} = this.props;

    if (movable) {
      return (
        <Draggable
          onStart={this._onMoveStart}
          onDrag={this._onMoveDrag}
          onEnd={this._onMoveEnd} >
          {children}
        </Draggable>
      );
    }
    return children;
  }

  renderContent() {
    const {height, minimized, minimizable, resizable} = this.props;

    if (minimizable && minimized) {
      return null;
    }

    const contentStyle = {
      ...STYLES.content,
      height
    };

    return (
      <div className="mc-float-panel--content" style={contentStyle} >
        { this.props.children }

        {resizable && (<Draggable className="mc-float-panel--resizer"
          style={STYLES.resizer}
          onStart={this._onResizeStart}
          onDrag={this._onResizeDrag} />)}
      </div>
    );
  }

  render() {
    const {title, x, y, width, height, className, parentWidth, parentHeight} = this.props;

    const containerStyle = {
      position: 'absolute',
      left: Math.min(x, Math.max(0, parentWidth - width)),
      top: Math.min(y, Math.max(0, parentHeight - height)),
      width
    };
    const containerClassName = `mc-float-panel shadow ${className}`;

    // Only title bar is draggable
    return (
      <div style={containerStyle} className={containerClassName} >
        {title ? this.renderMover(<div className="mc-float-panel--title">{title}</div>) :
          this.renderMover(this.renderContent())}
        {title && this.renderContent()}
      </div>
    );
  }
}
