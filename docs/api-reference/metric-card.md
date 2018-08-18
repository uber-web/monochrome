# MetricCard

A stateless component that renders a floating panel.

**Features**

* Multiple series
* Fully stylable
* Hover tooltip

## Usage

    import {MetricCard, MatricChart} from 'monochrome';

    <MetricCard
      title="Speed"
      description="This chart shows measured speed" >
      <MetricChart
        data={{
            car: [{x: 0, y: 0}, {x: 1, y: 0.5}, {x: 2, y: 1}]
            train: [{x: 0, y: 0}, {x: 1, y: 0.2}, {x: 2, y: 2}]
        }}
        unit="m/s"
        highlightX={0} />
    </MetricCard>

## API Reference

## MetricCard Props

* `className` **(string, optional)** - additional class name for the container
* `title` **(string|Element)** - title of the chart. If empty, the title bar will be hidden.
* `description` **(string|Element)** - description of the chart. It is shown when the title is hovered.
* `isLoading` **(bool)** - show a loading spinner
* `error` **(Error)** - show a message if loading the chart encounters an error.

## MetricChart Props

* `data` **(object)** - data to render, as a map from series name to an array of points.
* `width` **(number|string)** - width of the chart.
* `height` **(number|string)** - height of the chart.

* `margin` **(object, optional)** - margin of the plot. Default `{left: 20, top: 20, right: 20, bottom: 20}`.
* `unit` **(string, optional)** - unit of the y axis.
* `getX` **(function, optional)** - accessor of the `x` value from each data point. Default `d => d.x`.
* `getY` **(function, optional)** - accessor of the `y` value from each data point. Default `d => d.y`.
* `xDomain` **([number, number], optional)** - [min, max] of the x axis.
* `yDomain` **([number, number], optional)** - [min, max] of the y axis.
* `xTicks` **(number, optional)** - number of ticks to show on the x axis. Default `4`.
* `yTicks` **(number, optional)** - number of ticks to show on the y axis. Default `4`.
* `horizontalGridLines` **(number, optional)** - number of horizontal grid lines. Default `4`.
* `verticalGridLines` **(number, optional)** - number of vertical grid lines. Default `4`.
* `formatXTick` **(function, optional)** - format the label along the x axis.
* `formatYTick` **(function, optional)** - format the label along the y axis.
* `formatTitle` **(function, optional)** - format a series name for display in the tooltip.
* `formatValue` **(function, optional)** - format a data value for display in the tooltip.
* `lineColor` **(string, optional)** - the CSS color of a line. Default `black`.
* `lineColors` **(object, optional)** - a map from series name to the CSS color of its line. If the color of a series is not specified, falls back to `lineColor`.

### CSS Classes

* `mc-metric-card` - wrapper around the whole control
* `mc-metric-card--title` - the card title
* `mc-metric-card--preloader` - the loading spinner
* `mc-metric-card--error` - the error message
* `mc-metric-card--chart` - container of the chart
