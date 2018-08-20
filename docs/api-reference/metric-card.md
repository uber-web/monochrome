# Plot

Components that render a plot of multiple data series.

**Features**

* Multiple series
* Legends and toggles
* Fully stylable
* Hover tooltip

## Usage

    import {MetricCard, MetricChart, RichMetricChart} from 'monochrome';

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

## MetricCard

`MetricCard` is a wrapper component that renders the title and status of a metric.

### Props

* `className` **(string, optional)** - additional class name for the container
* `title` **(string|Element)** - title of the chart. If empty, the title bar will be hidden.
* `description` **(string|Element)** - description of the chart. It is shown when the title is hovered.
* `isLoading` **(bool)** - show a loading spinner
* `error` **(Error)** - show a message if loading the chart encounters an error.

## MetricChart

`MetricChart` renders a collection of line charts into a single x-y plot. Legends are only shown as tooltip when the chart is hovered over. If you have a large number of line series, see `RichMetricChart`.

### Data Props

* `data` **(object)** - data to render, as a map from series name to an array of points.
* `highlightX` **(number)** - x position of the crosshair when the chart is not hovered.
* `unit` **(string, optional)** - unit of the y axis.
* `getX` **(function, optional)** - accessor of the `x` value from each data point. Default `d => d.x`.
* `getY` **(function, optional)** - accessor of the `y` value from each data point. Default `d => d.y`.

### Styling Props

* `width` **(number|string)** - width of the chart.
* `height` **(number|string)** - height of the chart.
* `margin` **(object, optional)** - margin of the plot. Default `{left: 20, top: 20, right: 20, bottom: 20}`.
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
* `getColor` **(object|function|string, optional)** - the color accessor of a series. Default `#000`.
  + Type `string`: a CSS color string.
  + Type `object`: a map from series name to its CSS color.
  + Type `function`: a callback that receives a series name and returns its CSS color.

### Event Callback Props

* `onClick` **(function, optional)** - Called when the chart is clicked. Parameters:
  + `x` (number) - x value at the pointer position.
* `onMouseEnter` **(function, optional)** - Called when the pointer enters the chart area.
* `onMouseMove` **(function, optional)** - Called when the pointer moves inside the chart area.
* `onMouseLeave` **(function, optional)** - Called when the pointer leaves the chart area.
* `onSeriesMouseOver` **(function, optional)** - Called when the pointer enters a line series. Parameters:
  + `key` (string) - name of the series.
* `onNearestX` **(function, optional)** - Called when the pointer moves relative to a line series. Parameters:
  + `key` (string) - name of the series.
  + `value` (object) - datum that is closest to the pointer.
* `onSeriesMouseOut` **(function, optional)** - Called when the pointer leaves a line series. Parameters:
  + `key` (string) - name of the series.

## RichMetricChart

`RichMetricChart` renders a collection of line charts into a single x-y plot, and a list of legends to filter the data.

### Props

Every prop supported by `MetricChart`, plus the following:

* `topSeriesCount` **(number)** - Number of series to display by default. The data series are sorted by their peak value.


### CSS Classes

* `mc-metric-card` - wrapper around the whole control
* `mc-metric-card--title` - the card title
* `mc-metric-card--preloader` - the loading spinner
* `mc-metric-card--error` - the error message
* `mc-metric-chart` - container of the chart
* `mc-metric-chart--legend` - legend of a data series
* `mc-metric-chart--legend-icon` - the icon of a legend
* `mc-metric-chart--show-all` - the "show all" toggle of the legends
