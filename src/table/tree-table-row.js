import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {TableRowComponent, TableCell, Expander} from './styled-components';

/**
 * A stateless component that renders a data row in the TreeTable component
 */
export default class TreeTableRow extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
      data: PropTypes.array,
      children: PropTypes.array
    }),
    style: PropTypes.object,
    indentSize: PropTypes.number,
    renderCell: PropTypes.func,
    columns: PropTypes.array,
    getIsExpanded: PropTypes.func,
    toggleExpansion: PropTypes.func
  };

  _toggleExpansion(id) {
    this.props.toggleExpansion(id, this.props.id);
  }

  _renderItem = ({id, index, depth = 0, key, data, style}) => {
    const {indentSize, columns, theme, userStyle, renderCell, getIsExpanded} = this.props;

    const isExpanded = getIsExpanded(id);
    const hasChildren = data.children.length > 0;
    const indent = indentSize * (depth + 1);

    return (
      <div key={key} style={style}>
        <TableRowComponent theme={theme} index={index} userStyle={userStyle.row}>
          {hasChildren && (
            <Expander
              key="toggle"
              isExpanded={isExpanded}
              theme={theme}
              userStyle={userStyle.expander}
              style={{marginLeft: indent}}
              onClick={() => this._toggleExpansion(id)}
            >
              {isExpanded ? userStyle.iconExpanded || '▾' : userStyle.iconCollapsed || '▸'}
            </Expander>
          )}

          <div style={{flexShrink: 0, width: indent}} />

          {data.data.map((colValue, colIndex) => {
            const column = columns[colIndex];
            const width = colIndex === 0 ? column.width - indent : column.width;

            return (
              <TableCell
                key={colIndex}
                index={colIndex}
                style={{width}}
                title={`${column.name}: ${colValue}`}
                theme={theme}
                userStyle={userStyle.cell}
              >
                {renderCell({
                  value: colValue,
                  column: column.srcObject,
                  columnIndex: colIndex,
                  row: data.srcObject,
                  rowId: id
                })}
              </TableCell>
            );
          })}
        </TableRowComponent>

        {hasChildren &&
          isExpanded &&
          data.children.map((row, rowIndex) =>
            this._renderItem({
              depth: depth + 1,
              id: `${id}.${rowIndex}`,
              index: rowIndex,
              key: rowIndex,
              data: row
            })
          )}
      </div>
    );
  };

  render() {
    return this._renderItem({...this.props});
  }
}
