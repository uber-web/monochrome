import React, {Component} from 'react';

import {MetricCard, MetricChart} from 'monochrome';

const sampleData = {
  'Series 1': Array.from({length: 101}, (d, i) => {
    const x = i / 25;
    return [x, Math.sin(x * Math.PI)];
  }),
  'Series 2': Array.from({length: 101}, (d, i) => {
    const x = i / 25;
    return [x, Math.cos(x * Math.PI)];
  }),
  'Series 3': Array.from({length: 101}, (d, i) => {
    const x = i / 25;
    return [x, Math.sin(x * Math.PI) + 0.1, Math.sin(x * Math.PI) - 0.1];
  })
};

const lineColors = {
  'Series 1': '#004b78',
  'Series 2': '#907700',
  'Series 3': 'rgba(0, 80, 245, 0.5)'
};

const margin = {left: 48, right: 20, top: 20, bottom: 48};

export default class MetricCardExample extends Component {
  render() {
    return (
      <MetricCard title="Example Metric Card" description="This is an example metric card">
        <MetricChart
          width="100%"
          height={200}
          data={sampleData}
          unit="m/s"
          margin={margin}
          getX={d => d[0]}
          getY={d => d[1]}
          getY0={d => d[2]}
          getColor={lineColors}
          formatTitle={title => title}
          formatValue={v => v.toFixed(3)}
          formatXTick={x => `${x}π`}
          xTicks={3}
          yTicks={5}
          horizontalGridLines={5}
          verticalGridLines={0}
          highlightX={0}
        />
      </MetricCard>
    );
  }
}
