import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from '../shared/popover';

const STYLES = {
  container: {
    position: 'relative'
  }
};

/**
 * MetricCard places a chart in a container with padding, title,
 * selection marker etc
 */
export default class MetricCard extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    error: PropTypes.instanceOf(Error),
    isLoading: PropTypes.bool,

    children: PropTypes.element
  };

  static defaultProps = {
    className: '',
    title: '',
    description: '',

    error: null,
    warning: null,
    isLoading: false
  };


  render() {
    const { error, warning, isLoading, className, title, description } = this.props;

    return (
      <div className={`mc-metric-card ${className}`} style={STYLES.container} >
        {title && (
          <div key="header" className="mc-metric-card--title">
            <Tooltip content={description}>
              {title}
            </Tooltip>
          </div>
        )}

        {!isLoading && !error && this.props.children}
        {isLoading && <div className="mc-metric-card--preloader" />}

        {error && (
          <div key="error">
            <span className="mc-metric-card--error">{error}</span>
          </div>
        )}
      </div>
    );
  }
}
