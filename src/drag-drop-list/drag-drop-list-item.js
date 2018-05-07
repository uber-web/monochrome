/* global window */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Draggable from '../shared/draggable';

const noop = () => {};

const TRANSITION = 300;

export default class DragDropListItem extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
    removed: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragEnd: PropTypes.func
  };

  static defaultProps = {
    className: '',
    removed: false,
    onDragStart: noop,
    onDragMove: noop,
    onDragEnd: noop
  };

  state = {
    isDragging: false,
    isActive: false,
    width: 0,
    height: 0,
    dragStartOffset: {left: 0, top: 0},
    dragPos: null
  };;

  componentWillUnmount() {
    window.clearTimeout(this._timer);
  }

  _timer = null;

  getBoundingBox() {
    return this._container.getBoundingClientRect();
  }

  _onDragStart = (evt) => {
    const container = this._container;

    this.setState({
      isDragging: true,
      isActive: true,
      width: container.offsetWidth,
      height: container.offsetHeight,
      dragStartOffset: container.getBoundingClientRect(),
      dragPos: evt
    });

    this.props.onDragStart(evt);
  }

  _onDragMove = (evt) => {
    this.setState({dragPos: evt});
    this.props.onDragMove(evt);
  }

  _onDragEnd = (evt) => {
    this.setState({
      isDragging: false,
      dragStartOffset: this._container.getBoundingClientRect(),
      dragPos: {deltaX: 0, deltaY: 0}
    });

    // When transition is done, remove z-index and drop shadow
    this._timer = window.setTimeout(
      () => this.setState({isActive: false}),
      TRANSITION
    );

    this.props.onDragEnd(evt);
  }

  renderTitle() {
    const {title} = this.props;
    return typeof title === 'function' ? title() : title;
  }

  renderMover(children) {
    return (
      <Draggable
        onStart={this._onDragStart}
        onDrag={this._onDragMove}
        onEnd={this._onDragEnd}>
        {children}
      </Draggable>
    );
  }

  renderContent() {
    const {className} = this.props;
    const {isDragging, isActive, width, height, dragPos, dragStartOffset} = this.state;

    const contentStyle = isActive ? {
      boxSizing: 'border-box',
      position: 'fixed',
      left: dragStartOffset.left + dragPos.deltaX,
      top: dragStartOffset.top + dragPos.deltaY,
      width,
      height,
      transition: isDragging ? undefined : `all ${TRANSITION}ms`
    } : {};

    const contentClassName =
      classnames('mc-drag-drop-list--item-content', className);

    const title = this.renderTitle();

    return title ? (
      <div className={contentClassName} style={contentStyle} >
        {this.renderMover(<div className="mc-drag-drop-list--item-title" >{title}</div>)}
        {this.props.children}
      </div>
    ) : this.renderMover(
      <div className={contentClassName} style={contentStyle} >
        {this.props.children}
      </div>
    );
  }

  render() {
    const {removed} = this.props;
    const {isDragging, isActive, width, height} = this.state;

    const containerClassName =
      classnames('mc-drag-drop-list--item', {active: isActive}, {dragging: isDragging});

    const placeholderClassName = classnames('mc-drag-drop-list--placeholder', {removed})

    const placeholderStyle = {
      boxSizing: 'border-box',
      transition: `height ${TRANSITION}ms`,
      width,
      height: removed ? 0 : height
    };

    return (
      <div className={containerClassName}
        ref={ref => {
          this._container = ref;
        }} >
        {this.renderContent()}
        {isActive && <div className={placeholderClassName} style={placeholderStyle} />}
      </div>
    );
  }

}
