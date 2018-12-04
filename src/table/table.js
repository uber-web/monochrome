import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import CellMeasurer, {CellMeasurerCache} from 'react-virtualized/dist/commonjs/CellMeasurer';

import {withTheme} from '../shared/theme';

import TableHeader from './table-header';
import TableRow from './table-row';
import {WrapperComponent, TableBody} from './styled-components';

export class Table extends PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    columns: PropTypes.array,
    rows: PropTypes.array,
    renderHeader: PropTypes.func,
    renderCell: PropTypes.func
  };

  static defaultProps = {
    width: '100%',
    height: 400,
    style: {},
    rows: [],
    renderHeader: ({column}) => column.name,
    renderCell: ({value}) => (value === null ? null : String(value))
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: null,
      sortFunc: null,
      rows: this._formatRows(props.rows)
    };

    this._cache = new CellMeasurerCache({fixedWidth: true});
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.rows !== nextProps.rows) {
      this.setState({
        rows: this._formatRows(nextProps.rows, this.state.sortFunc)
      });
      this._forceUpdate();
    }
  }

  _formatRows(rows, sortFunc) {
    rows = rows.map((row, rowIndex) => ({
      srcObject: row,
      data: row.data,
      children: row.children,
      id: String(rowIndex)
    }));

    if (sortFunc) {
      rows.sort(sortFunc);
    }

    return rows;
  }

  _onHeaderResize = columns => {
    this.setState({columns}, this._forceUpdate);
  };

  _onSort = sortFunc => {
    const {rows} = this.state;

    if (sortFunc) {
      rows.sort(sortFunc);
    }

    this.setState({sortFunc});
    this._forceUpdate();
  };

  _forceUpdate = () => {
    if (this._list) {
      this._cache.clearAll();
      this._list.recomputeRowHeights();
    }
  };

  _renderRow({key, index, style}) {
    const {renderCell, theme, style: userStyle} = this.props;
    const row = this.state.rows[index];

    return (
      <TableRow
        key={key}
        id={row.id}
        index={index}
        data={row}
        style={style}
        theme={theme}
        userStyle={userStyle}
        renderCell={renderCell}
        columns={this.state.columns}
      />
    );
  }

  _renderRowMeasurer = ({key, parent, index, style}) => {
    return (
      <CellMeasurer cache={this._cache} parent={parent} key={key} rowIndex={index} collumnIndex={0}>
        {() => this._renderRow({key, index, style})}
      </CellMeasurer>
    );
  };

  // AutoSizer is a pure component. By default child function is only called if dimensions change.
  // Rebind this function every render to respond to state change
  _renderBody({width, height}) {
    const {columns, rows} = this.state;

    if (!columns) {
      return null;
    }

    return (
      <List
        ref={list => {
          this._list = list;
        }}
        tabIndex={null}
        height={height}
        rowCount={rows.length}
        rowHeight={this._cache.rowHeight}
        rowRenderer={this._renderRowMeasurer}
        width={width}
      />
    );
  }

  render() {
    const {theme, width, height, style, columns, renderHeader} = this.props;

    return (
      <WrapperComponent style={{width, height}} theme={theme} userStyle={style.wrapper}>
        <TableHeader
          theme={theme}
          userStyle={style}
          columns={columns}
          renderHeader={renderHeader}
          onSort={this._onSort}
          onResize={this._onHeaderResize}
        />

        <TableBody theme={theme} userStyle={style.body}>
          <AutoSizer>{this._renderBody.bind(this)}</AutoSizer>
        </TableBody>
      </WrapperComponent>
    );
  }
}

export default withTheme(Table);
