import React, {Component} from 'react';
import {Table, TreeTable} from 'monochrome';

/* Generate random data */
const COLUMNS = [
  {name: 'Object ID', id: 0, type: 'string'},
  {name: 'Timestamp', id: 1, type: 'int'},
  {name: 'Source', id: 2, type: 'string'},
  {name: 'Index', id: 3, type: 'string'},
  {name: 'Promoted', id: 4, type: 'boolean'},
  {name: 'Anomaly', id: 5, type: 'boolean'}
];

const sources = 'US EU China Brazil India Turkey Japan'.split(' ');
const len = [8, 4, 4, 4, 12];
const id = [0, 0, 0, 0, 0];

const makeUuid = () => {
  return id.map((d, i) => String(d).padStart(len[i], '0')).join('-');
};

const makeRandomData = depth => {
  id[depth]++;

  const childCount = depth < id.length - 1 ? Math.round(1 / (depth + 1) / Math.random()) : 0;

  return {
    data: [
      makeUuid(), // string
      Date.now(), // int
      depth > 0 ? null : sources[Math.floor(Math.random() * sources.length)], // string
      depth > 0 ? null : id.reduce((sum, d) => sum + d, 0).toString(), // string
      Math.random() < 0.3, // bool
      Math.random() < 0.7 // bool
    ],
    children: Array.from({length: childCount}, () => makeRandomData(depth + 1))
  };
};

const ROWS = Array.from({length: 200}, () => makeRandomData(0));

export default class TreeTableExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Table</h3>
        <Table columns={COLUMNS} rows={ROWS} style={{height: 400}} />

        <h3>TreeTable</h3>
        <TreeTable columns={COLUMNS} rows={ROWS} style={{height: 400}} />
      </div>
    );
  }
}
