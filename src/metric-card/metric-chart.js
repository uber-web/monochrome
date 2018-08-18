import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from '../shared/autosizer';

import XYPlot from 'react-vis/dist/plot/xy-plot';
import LineSeries from 'react-vis/dist/plot/series/line-series';
import MarkSeries from 'react-vis/dist/plot/series/mark-series';
import HorizontalGridLines from 'react-vis/dist/plot/horizontal-grid-lines';
import VerticalGridLines from 'react-vis/dist/plot/vertical-grid-lines';
import XAxis from 'react-vis/dist/plot/axis/x-axis';
import YAxis from 'react-vis/dist/plot/axis/y-axis';
import Crosshair from 'react-vis/dist/plot/crosshair';

const noop = () => {};

/**
 * A metric chart draws a chart with optional percentiles and lags
 */
export default class MetricChart extends PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    margin: PropTypes.object,
    unit: PropTypes.string,

    data: PropTypes.object,

    getX: PropTypes.func,
    getY: PropTypes.func,
    xDomain: PropTypes.array,
    yDomain: PropTypes.array,

    xTicks: PropTypes.number,
    yTicks: PropTypes.number,
    horizontalGridLines: PropTypes.number,
    verticalGridLines: PropTypes.number,

    highlightValues: PropTypes.object,

    formatYTick: PropTypes.func,
    formatTitle: PropTypes.func,
    formatValue: PropTypes.func,
    formatXTick: PropTypes.func,

    lineColor: PropTypes.string,
    lineColors: PropTypes.object
  };

  static defaultProps = {
    margin: { left: 20, right: 20, top: 20, bottom: 20 },
    data: {},
    unit: '',

    onClick: noop,
    onMouseOver: noop,
    onMouseOut: noop,
    onNearestX: noop,

    getX: (d) => d.x,
    getY: (d) => d.y,

    // Backward compatibility
    xTicks: 4,
    yTicks: 4,
    horizontalGridLines: 4,
    verticalGridLines: 4,

    formatTitle: (value) => String(value),
    formatValue: (value) => String(value),
    // TODO: This is likely a bug.
    // `Date(<any number>)` will always return
    // the current date.
    // $FlowFixMe
    formatXTick: (value) => String(value),
    formatYTick: (value) => String(value),

    lineColor: '#000',
    lineColors: {}
  };

  state = {chartWidth: 0, chartHeight: 0};

  _onResize = ({width, height}) => {
    this.setState({chartWidth: width, chartHeight: height});
  }

  /* eslint-disable max-depth */
  _getScaleSettings() {
    const { data, xDomain, yDomain, getX, getY } = this.props;

    if (xDomain && yDomain) {
      return {xDomain, yDomain};
    }

    let x = [Infinity, -Infinity];
    let y = [0, 0];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const values = data[key];
        if (Array.isArray(values) && values.length > 0) {
          x = xDomain || values.reduce((acc, d) => {
            acc[0] = Math.min(acc[0], getX(d));
            acc[1] = Math.max(acc[1], getX(d));
            return acc;
          }, x);
          y = yDomain || values.reduce((acc, d) => {
            acc[0] = Math.min(acc[0], getY(d));
            acc[1] = Math.max(acc[1], getY(d));
            return acc;
          }, y);
        }
      }
    }

    return { xDomain: x, yDomain: y };
  }
  /* eslint-enable max-depth */

  // Populate series
  _renderLineSeries() {
    const { data, lineColors, lineColor, getX, getY, xDomain } = this.props;

    return Object.keys(data).map(key => {
      // Temporary patch until vis-gl fixes issue with rendering data outside of domain
      // https://github.com/uber/react-vis/issues/627
      const datums = xDomain ? data[key].filter(point => {
        const x = getX(point);
        return x >= xDomain[0] && x <= xDomain[1];
      }) : data[key];
      return (
        <LineSeries
          key={`value-${key}-line`}
          data={datums}
          getX={getX}
          getY={getY}
          color={lineColors[key] || lineColor}
          onNearestX={this.props.onNearestX.bind(this, key)}
        />
      );
    });
  }

  _renderCrosshair() {
    const { highlightValues } = this.props;

    if (!highlightValues) {
      return null;
    }

    const { unit, lineColors, lineColor, formatTitle, formatValue, getX, getY, xDomain } = this.props;

    const crosshairItems = Object.keys(highlightValues)
      .filter(key => {
        const value = highlightValues[key];
        const x = getX(value);
        return !xDomain || (x >= xDomain[0] && x <= xDomain[1]);
      })
      .map(key => {
        const value = highlightValues[key];
        const color = lineColors[key] || lineColor;
        const x = getX(value);
        const y = getY(value);
        return {
          x,
          y,
          title: (
            <span>
              <div className="rv-crosshair__item__legend" style={{ background: color }} />
              {formatTitle(key)}
            </span>
          ),
          value: (
            <span>
              {formatValue(y)}
              {unit && <span className="rv-crosshair__item__unit">{unit}</span>}
            </span>
          ),
          color
        };
      });

    return [
      <Crosshair
        key="crosshair"
        values={crosshairItems}
        titleFormat={() => null}
        itemsFormat={values => values}
      />,
      <MarkSeries key="hovered-values" data={crosshairItems} getFill={d => d.color} fillType="literal" />
    ];
  }

  render() {
    const {
      width,
      height,
      margin,
      formatYTick,
      formatXTick,
      xTicks,
      yTicks,
      horizontalGridLines,
      verticalGridLines,
      onClick
    } = this.props;

    const {chartWidth, chartHeight} = this.state;

    return (
      <div className="mc-metric-card--chart" onClick={onClick} style={{width, height}} >
        <AutoSizer onResize={this._onResize} />

        <XYPlot
          width={chartWidth}
          height={chartHeight}
          margin={margin}
          {...this._getScaleSettings()}
          onMouseEnter={this.props.onMouseOver}
          onMouseLeave={this.props.onMouseOut.bind(this)}
        >
          {xTicks > 0 && <XAxis title="" tickFormat={formatXTick} tickTotal={xTicks} />}

          {yTicks > 0 && <YAxis title="" tickFormat={formatYTick} tickTotal={yTicks} />}

          {horizontalGridLines > 0 && <HorizontalGridLines tickTotal={horizontalGridLines} />}
          {verticalGridLines > 0 && <VerticalGridLines tickTotal={verticalGridLines} />}

          {this._renderLineSeries()}
          {this._renderCrosshair()}
        </XYPlot>
      </div>
    );
  }
}
