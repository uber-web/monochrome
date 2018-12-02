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

const style = {
  width: '100%',
  height: 200,
  margin: {left: 48, right: 20, top: 20, bottom: 48},
  tooltip: {
    background: 'rgba(0, 0, 0, 0.8)'
  }
};

const BORDER_STYLE = {
  margin: 2,
  flexGrow: 1,
  border: 'solid 1px #ccc',
  minHeight: 200
};

export default class MetricCardExample extends Component {
  render() {
    return (
      <div>
        <div style={BORDER_STYLE}>
          <MetricCard title="Example Metric Card" description="This is an example metric card">
            <MetricChart
              style={style}
              data={sampleData}
              unit="m/s"
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
        </div>
        <div style={{display: 'flex'}}>
          <div style={BORDER_STYLE}>
            <MetricCard
              title="Example Metric Card"
              description="This is an example metric card loading"
              isLoading={true}
            />
          </div>
          <div style={BORDER_STYLE}>
            <MetricCard
              title="Example Metric Card"
              description="This is an example metric card with error"
              error="Cannot load data"
            />
          </div>
        </div>
      </div>
    );
  }
}
