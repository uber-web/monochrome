import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from '../shared/autosizer';

import XYPlot from 'react-vis/dist/plot/xy-plot';
import AreaSeries from 'react-vis/dist/plot/series/area-series';
import LineSeries from 'react-vis/dist/plot/series/line-series';
import MarkSeries from 'react-vis/dist/plot/series/mark-series';
import HorizontalGridLines from 'react-vis/dist/plot/horizontal-grid-lines';
import VerticalGridLines from 'react-vis/dist/plot/vertical-grid-lines';
import XAxis from 'react-vis/dist/plot/axis/x-axis';
import YAxis from 'react-vis/dist/plot/axis/y-axis';
import Crosshair from 'react-vis/dist/plot/crosshair';

import { scaleLinear } from 'd3-scale';

const noop = () => {};

/**
 * A metric chart draws a chart with optional percentiles and lags
 */
export default class Chart extends PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    margin: PropTypes.object,
    unit: PropTypes.string,

    data: PropTypes.object,
    dataFilter: PropTypes.func,

    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onNearestX: PropTypes.func,
    onSeriesMouseOver: PropTypes.func,
    onSeriesMouseOut: PropTypes.func,

    getX: PropTypes.func,
    getY0: PropTypes.func,
    getY: PropTypes.func,
    xDomain: PropTypes.array,
    yDomain: PropTypes.array,

    xTicks: PropTypes.number,
    yTicks: PropTypes.number,
    horizontalGridLines: PropTypes.number,
    verticalGridLines: PropTypes.number,

    highlightSeries: PropTypes.string,
    highlightValues: PropTypes.object,

    formatYTick: PropTypes.func,
    formatTitle: PropTypes.func,
    formatValue: PropTypes.func,
    formatXTick: PropTypes.func,

    getColor: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
  };

  static defaultProps = {
    width: '100%',
    height: 300,
    margin: { left: 20, right: 20, top: 20, bottom: 20 },
    data: {},
    dataFilter: (key) => true,
    unit: '',

    onClick: noop,
    onMouseEnter: noop,
    onMouseMove: noop,
    onMouseLeave: noop,
    onNearestX: noop,
    onSeriesMouseOver: noop,
    onSeriesMouseOut: noop,

    getX: (d) => d.x,
    getY0: (d) => null,
    getY: (d) => d.y,

    // Backward compatibility
    xTicks: 4,
    yTicks: 4,
    horizontalGridLines: 4,
    verticalGridLines: 4,

    formatTitle: (value) => String(value),
    formatValue: (value) => String(value),

    formatXTick: (value) => String(value),
    formatYTick: (value) => String(value),

    getColor: '#000'
  };

  /* eslint-disable max-depth */
  _getScaleSettings() {
    const { data, dataFilter, xDomain, yDomain, getX, getY0, getY } = this.props;

    if (xDomain && yDomain) {
      return {xDomain, yDomain};
    }

    let x = xDomain || [Infinity, -Infinity];
    let y = yDomain || [0, 0];

    for (const key in data) {
      if (dataFilter(key)) {
        const values = data[key];
        if (Array.isArray(values) && values.length > 0) {
          x = xDomain || values.reduce((acc, d) => {
            const x = getX(d);
            acc[0] = Math.min(acc[0], x);
            acc[1] = Math.max(acc[1], x);
            return acc;
          }, x);
          y = yDomain || values.reduce((acc, d) => {
            const y = getY(d);
            const y0 = getY0(d);
            acc[0] = Math.min(acc[0], y);
            acc[1] = Math.max(acc[1], y);
            if (Number.isFinite(y0)) {
              acc[0] = Math.min(acc[0], y0);
              acc[1] = Math.max(acc[1], y0);
            }
            return acc;
          }, y);
        }
      }
    }

    if (!yDomain) {
      // Snap the bounds to nice round numbers
      y = scaleLinear().domain(y).nice().domain();
    }

    return { xDomain: x, yDomain: y };
  }
  /* eslint-enable max-depth */

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

  // Populate series
  _renderSeries() {
    const { data, dataFilter, highlightSeries, getX, getY0, getY, xDomain } = this.props;
    const areas = [];
    const lines = [];

    Object.keys(data).forEach(key => {
      if (!dataFilter(key)) {
        return;
      }

      // Temporary patch until vis-gl fixes issue with rendering data outside of domain
      // https://github.com/uber/react-vis/issues/627
      const datums = xDomain ? data[key].filter(point => {
        const x = getX(point);
        return x >= xDomain[0] && x <= xDomain[1];
      }) : data[key];

      if (!datums.length) {
        return;
      }

      const isArea = Number.isFinite(getY0(datums[0]));
      const Type = isArea ? AreaSeries : LineSeries;
      const color = this._getColor(key);

      const series = (
        <Type
          key={`value-${key}-line`}
          data={datums}
          getX={getX}
          getY={getY}
          getY0={getY0}
          color={color}
          fill={color}
          strokeWidth={highlightSeries === key ? 4 : 2}
          onNearestX={this.props.onNearestX.bind(this, key)}
          onSeriesMouseOver={() => this.props.onSeriesMouseOver(key)}
          onSeriesMouseOut={() => this.props.onSeriesMouseOut(key)}
        />
      );

      if (isArea) {
        areas.push(series);
      } else {
        lines.push(series);
      }
    });

    // Render lines on top
    return areas.concat(lines);
  }

  _renderCrosshair() {
    const { highlightValues } = this.props;

    if (!highlightValues) {
      return null;
    }

    const { unit, dataFilter, getColor, formatTitle, formatValue, getX, getY, getY0, xDomain } = this.props;

    const crosshairItems = Object.keys(highlightValues)
      .filter(key => {
        const value = highlightValues[key];
        const x = getX(value);
        return dataFilter(key) && (!xDomain || (x >= xDomain[0] && x <= xDomain[1]));
      })
      .map(key => {
        const value = highlightValues[key];
        const color = this._getColor(key);
        const x = getX(value);
        const y = getY(value);
        const y0 = getY0(value);
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
              {Number.isFinite(y0) && `${formatValue(y0)}, `}
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

      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      onClick
    } = this.props;

    return (
      <div className="mc-metric-chart" style={{width, height}} >
        <AutoSizer >
          {({width: chartWidth, height: chartHeight}) => (
            <XYPlot
              width={chartWidth}
              height={chartHeight}
              margin={margin}
              {...this._getScaleSettings()}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              {xTicks > 0 && <XAxis title="" tickFormat={formatXTick} tickTotal={xTicks} />}

              {yTicks > 0 && <YAxis title="" tickFormat={formatYTick} tickTotal={yTicks} />}

              {horizontalGridLines > 0 && <HorizontalGridLines tickTotal={horizontalGridLines} />}
              {verticalGridLines > 0 && <VerticalGridLines tickTotal={verticalGridLines} />}

              {this._renderSeries()}
              {this._renderCrosshair()}
            </XYPlot>
          )}
        </AutoSizer>
      </div>
    );
  }
}
