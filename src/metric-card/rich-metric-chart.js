import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MetricChart from './metric-chart';

import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { extent } from 'd3-array';

const DEFAULT_COLORS = scaleOrdinal().range([
  '#12939A',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#125C77',
  '#4DC19C',
  '#776E57',
  '#17B8BE',
  '#F6D18A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#829AE3',
  '#E79FD5',
  '#1E96BE',
  '#89DAC1',
  '#B3AD9E'
]);

const STYLES = {
  clickable: {
    cursor: 'pointer'
  }
};

/**
 * A component that visualizes the multiple data series. Features:
 * Each data series is shown as a line series
 * Clicking on the legend toggles the visibility of that data series
 * Legends are sorted by prominence (maximum value in the look ahead window)
 * A show all/show less button to toggle only showing the top 5 data series by value
 */
export default class MetricChartWithLegends extends PureComponent {
  static propTypes = Object.assign({}, MetricChart.propTypes, {
    topSeriesCount: PropTypes.number
  });

  static defaultProps = Object.assign({}, MetricChart.defaultProps,{
    topSeriesCount: 5,
    getColor: DEFAULT_COLORS
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSeries: this._extractDataSeries(props),
      dataVisibility: {},
      showTopSeriesOnly: true,
      hoveredSeriesName: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSeries: this._extractDataSeries(nextProps)
      });
    }
  }

  _getColor(key) {
    const { getColor } = this.props;

    switch (typeof getColor) {
    case 'object':
      return getColor[key];

    case 'function':
      return getColor(key);

    default:
      return getColor;
    }
  }

  // Extract subset of streams from all variable streams
  // Format stream data for render
  _extractDataSeries({data, formatTitle, getY}) {
    const series = [];
    for (const key in data) {
      const value = data[key];
      if (Array.isArray(value)) {
        const displayName = this.props.formatTitle(key);
        const yExtent = extent(value, getY);
        series.push({
          key,
          displayName,
          color: this._getColor(key),
          data: value,
          extent: yExtent,
          max: Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]))
        });
      }
    }

    // Sort data series by max value
    series.sort((s1, s2) => s2.max - s1.max);

    return series;
  }

  // Check if a certain data series is turned on by user settings
  _isDataVisible = (key) => {
    const { showTopSeriesOnly, dataSeries, dataVisibility } = this.state;
    if (dataVisibility[key] === false) {
      // turned of by the user
      return false;
    }
    if (showTopSeriesOnly) {
      const { topSeriesCount } = this.props;
      return dataSeries.findIndex(s => s.key === key) < topSeriesCount;
    }
    return true;
  };

  _setHoveredDataName = (key) => {
    this.setState({ hoveredSeriesName: key });
  }

  _toggleDataVisibility = (key) => {
    const { dataVisibility } = this.state;

    this.setState({
      dataVisibility: {
        ...dataVisibility,
        // at start, all streams have undefined which is treated as visible
        [key]: dataVisibility[key] === false
      }
    });
  }

  // Legends (also as visibility toggle) of the data streams
  _renderDataLegends() {
    const { dataSeries, showTopSeriesOnly, hoveredSeriesName } = this.state;
    const { topSeriesCount } = this.props;

    const series = showTopSeriesOnly ? dataSeries.slice(0, topSeriesCount) : dataSeries;

    return (
      <div className="mc-metric-chart--legends-container">
        {dataSeries.length > topSeriesCount && (
          <div
            className={`mc-metric-chart--show-all ${showTopSeriesOnly ? '' : 'expanded'}`}
            style={STYLES.clickable}
            onClick={() => this.setState({ showTopSeriesOnly: !showTopSeriesOnly })}
          >
            {showTopSeriesOnly ? 'Show all' : 'Show less'}
          </div>
        )}

        {series.map(s => {
          const className = classnames('mc-metric-chart--legend', {
            hovered: hoveredSeriesName === s.key,
            off: !this._isDataVisible(s.key)
          });

          return (
            <div
              className={className}
              style={STYLES.clickable}
              key={`multiplot-${s.key}`}
              onMouseOver={() => this._setHoveredDataName(s.key)}
              onMouseOut={() => this._setHoveredDataName(null)}
              onClick={() => this._toggleDataVisibility(s.key)}
            >
              <div className="mc-metric-chart--legend-icon" style={{ background: s.color }} />
              <span>{s.displayName}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <MetricChart {...this.props}
          highlightSeries={this.state.hoveredSeriesName}
          onSeriesMouseOver={key => this._setHoveredDataName(key)}
          onMouseLeave={() => this._setHoveredDataName(null)}
          dataFilter={this._isDataVisible}
        />
        {this._renderDataLegends()}
      </div>
    );
  }
}
