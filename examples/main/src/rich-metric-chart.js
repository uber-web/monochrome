import React, {Component} from 'react';

import {RichMetricChart} from 'monochrome';

const sampleData = {};

for (let k = 1; k <= 10; k++) {
  sampleData[`Series ${k}`] = Array.from({length: 101}, (d, i) => {
    const x = i / 50;
    return [x, Math.pow(x, k / 2)];
  });
}

const margin = {left: 48, right: 20, top: 20, bottom: 48};

export default class MetricCardExample extends Component {
  render() {
    return (
      <RichMetricChart
        width="100%"
        height={400}
        data={sampleData}
        unit="m/s"
        margin={margin}
        getX={d => d[0]}
        getY={d => d[1]}
        formatTitle={title => title}
        formatValue={v => v.toFixed(3)}
        xTicks={3}
        yTicks={5}
        horizontalGridLines={5}
        verticalGridLines={0}
        highlightX={0}
      />
    );
  }
}
