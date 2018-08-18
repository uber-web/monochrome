import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { findNearestValue } from './utils';
import MetricChart from './metric-chart';

/**
 * A metric chart draws a chart with optional percentiles and lags
 */
export default class StatefulMetricChart extends PureComponent {
  static propTypes = Object.assign(
    {
      highlightX: PropTypes.number
    },
    MetricChart.propTypes
  );

  static defaultProps = MetricChart.defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      // The nearest data point to the cursor in each series
      hoveredValues: {},
      // The nearest data point to the current time in each series
      currentValues: this._getCurrentValues(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.highlightX !== nextProps.highlightX || this.props.data !== nextProps.data) {
      this.setState({
        currentValues: this._getCurrentValues(nextProps)
      });
    }
  }

  // Find the closest data point in each series to the current time
  _getCurrentValues({ highlightX, data, getX }) {
    if (!Number.isFinite(highlightX) || !data) {
      return null;
    }

    const result = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        result[key] = findNearestValue(data[key], highlightX, getX);
      }
    }
    return result;
  }

  _onClick = () => {
    this.props.onClick(this.state.hoveredX);
  };

  _onNearestX = (key, value) => {
    const { hoveredValues } = this.state;
    hoveredValues[key] = value;

    this.setState({
      isHovered: true,
      hoveredX: this.props.getX(value),
      hoveredValues: { ...hoveredValues }
    });
  };

  _onMouseOut = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { isHovered, hoveredValues, currentValues } = this.state;

    return (
      <MetricChart
        {...this.props}
        onClick={this._onClick}
        onNearestX={this._onNearestX}
        onMouseOut={this._onMouseOut}
        highlightValues={isHovered ? hoveredValues : currentValues}
      />
    );
  }
}
