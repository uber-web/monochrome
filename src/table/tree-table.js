import React from 'react';
import PropTypes from 'prop-types';

import {withTheme} from '../shared/theme';

import {Table} from './table';
import TreeTableRow from './tree-table-row';

class TreeTable extends Table {
  static propTypes = {
    ...Table.propTypes,
    indentSize: PropTypes.number
  };

  static defaultProps = {
    ...Table.defaultProps,
    indentSize: 12
  };

  constructor(props) {
    super(props);

    this.state.expanded = {};
  }

  _isRowExpanded = id => {
    return this.state.expanded[id];
  };

  _toggleRowExpansion = (id, rootId) => {
    const {expanded, rows} = this.state;

    expanded[id] = !expanded[id];

    const rootRowIndex = rows.findIndex(row => row.id === rootId);

    this._cache.clear(rootRowIndex);
    this._list.recomputeRowHeights(rootRowIndex);
  };

  _renderRow({key, index, style}) {
    const {indentSize, renderCell, theme, style: userStyle} = this.props;
    const row = this.state.rows[index];

    return (
      <TreeTableRow
        key={key}
        id={row.id}
        index={index}
        data={row}
        style={style}
        theme={theme}
        userStyle={userStyle}
        indentSize={indentSize}
        renderCell={renderCell}
        getIsExpanded={this._isRowExpanded}
        toggleExpansion={this._toggleRowExpansion}
        columns={this.state.columns}
      />
    );
  }
}

export default withTheme(TreeTable);
