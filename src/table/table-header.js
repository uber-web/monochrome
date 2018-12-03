import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import AutoSizer from '../shared/autosizer';

import {HeaderContainer, HeaderCell, SortIcon} from './styled-components';

const SORT = {
  NONE: 0,
  ASCEND: 1,
  DESCEND: 2
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    const {renderHeader, theme, userStyle} = this.props;

    const styleProps = {
      theme,
      isAscending: column.sort === SORT.ASCEND,
      isDescending: column.sort === SORT.DESCEND
    };

    let icon = null;
    if (styleProps.isAscending) {
      icon = userStyle.iconAscending || '↑';
    } else if (styleProps.isDescending) {
      icon = userStyle.iconDescending || '↓';
    }

    return (
      <HeaderCell
        {...styleProps}
        userStyle={userStyle.headerCell}
        style={{width: column.defaultWidth}}
        key={colIndex}
        index={colIndex}
        ref={cell => {
          this._cells[colIndex] = cell;
        }}
        onClick={() => this._sortColumn(colIndex)}
      >
        {renderHeader({column: column.srcObject, columnIndex: colIndex})}
        {icon && (
          <SortIcon {...styleProps} userStyle={userStyle.sort}>
            {icon}
          </SortIcon>
        )}
      </HeaderCell>
    );
  };

  render() {
    const {theme, userStyle} = this.props;
    const {columns} = this.state;

    return (
      <HeaderContainer theme={theme} userStyle={userStyle.header}>
        {columns.map(this._renderColumn)}
        <AutoSizer onResize={this._onResize} debounceTime={200} />
      </HeaderContainer>
    );
  }
}
