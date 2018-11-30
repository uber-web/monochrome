import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AutoSizer from '../shared/autosizer';

const SORT = {
  NONE: 0,
  ASCEND: 1,
  DESCEND: 2
};

const STYLES = {
  container: {
    display: 'table',
    flex: '0 0 auto'
  },
  icon: {
    position: 'absolute'
  }
};

export default class TableHeader extends PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    renderHeader: PropTypes.func,
    onSort: PropTypes.func,
    onResize: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: this._formatColumns(props.columns)
    };

    this._cells = [];
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.columns !== nextProps.columns) {
      this.setState({
        columns: this._formatColumns(nextProps.columns)
      });
    }
  }

  _formatColumns(columns) {
    let totalWeight = 0;
    const weights = [];

    columns.forEach((col, colIndex) => {
      let weight = 1;
      if (colIndex === 0) {
        weight++;
      }
      if (col.type === 'string') {
        weight++;
      }
      weights[colIndex] = weight;
      totalWeight += weight;
    });

    return columns.map((col, colIndex) => ({
      srcObject: col,
      name: col.name,
      type: col.type,
      sort: SORT.NONE,
      defaultWidth: `${(100 / totalWeight) * weights[colIndex]}%`
    }));
  }

  _onResize = () => {
    const {columns} = this.state;

    columns.map((col, colIndex) => {
      const ref = this._cells[colIndex];
      if (ref) {
        col.width = ref.clientWidth;
      }
    });

    this.props.onResize(columns);
  };

  _sortColumn = index => {
    const {columns} = this.state;
    const sortType = columns[index].sort === SORT.ASCEND ? SORT.DESCEND : SORT.ASCEND;

    columns.forEach((col, colIndex) => {
      col.sort = colIndex === index ? sortType : SORT.NONE;
    });

    const multiplier = sortType === SORT.ASCEND ? 1 : -1;

    const sortFunc = (row1, row2) => {
      return row1.data[index] <= row2.data[index] ? -multiplier : multiplier;
    };
    this.props.onSort(sortFunc);

    // Trigger rerender
    this.forceUpdate();
  };

  _renderColumn = (column, colIndex) => {
    const {renderHeader} = this.props;

    const className = classnames('mc-table--header-cell', {
      ascending: column.sort === SORT.ASCEND,
      descending: column.sort === SORT.DESCEND
    });

    const style = {
      cursor: 'pointer',
      display: 'table-cell',
      position: 'relative',
      width: column.defaultWidth
    };

    return (
      <div
        className={className}
        key={colIndex}
        style={style}
        ref={cell => {
          this._cells[colIndex] = cell;
        }}
        onClick={() => this._sortColumn(colIndex)}
      >
        {renderHeader({column: column.srcObject, columnIndex: colIndex})}
        {column.sort !== SORT.NONE && <div className="mc-table--sort-icon" style={STYLES.icon} />}
      </div>
    );
  };

  render() {
    const {columns} = this.state;

    return (
      <div className="mc-table--header" style={STYLES.container}>
        {columns.map(this._renderColumn)}
        <AutoSizer onResize={this._onResize} debounceTime={200} />
      </div>
    );
  }
}
