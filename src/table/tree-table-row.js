import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {STYLES} from './table-row';

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

  _renderItem = ({id, depth = 0, key, data, style}) => {
    const {indentSize, columns, renderCell, getIsExpanded} = this.props;

    const isExpanded = getIsExpanded(id);
    const hasChildren = data.children.length > 0;
    const indent = indentSize * (depth + 1);

    const expanderStyle = hasChildren && {
      position: 'absolute',
      cursor: 'pointer',
      marginLeft: indent
    };

    return (
      <div key={key} className="mc-table--item" style={style}>
        <div className="mc-table--row" style={STYLES.row}>
          {hasChildren && (
            <div
              key="toggle"
              className={classnames('mc-table--row-expander', {expanded: isExpanded})}
              style={expanderStyle}
              onClick={() => this._toggleExpansion(id)}
            />
          )}

          <div style={{flexShrink: 0, width: indent}} />

          {data.data.map((colValue, colIndex) => {
            const column = columns[colIndex];
            const width = colIndex === 0 ? column.width - indent : column.width;
            const cellStyle = {
              ...STYLES.cell,
              width
            };

            return (
              <div
                className="mc-table--cell"
                key={colIndex}
                style={cellStyle}
                title={`${column.name}: ${colValue}`}
              >
                {renderCell({
                  value: colValue,
                  column: column.srcObject,
                  columnIndex: colIndex,
                  row: data.srcObject,
                  rowId: id
                })}
              </div>
            );
          })}
        </div>

        {hasChildren &&
          isExpanded &&
          data.children.map((row, rowIndex) =>
            this._renderItem({
              depth: depth + 1,
              id: `${id}.${rowIndex}`,
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
