import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {TableRowComponent, TableCell} from './styled-components';

/**
 * A stateless component that renders a data row in the Table component
 */
export default class TableRow extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
      data: PropTypes.array
    }),
    style: PropTypes.object,
    renderCell: PropTypes.func,
    columns: PropTypes.array
  };

  render() {
    const {id, index, data, theme, userStyle, columns, style, renderCell} = this.props;

    return (
      <div style={style}>
        <TableRowComponent theme={theme} index={index} userStyle={userStyle.row}>
          {data.data.map((colValue, colIndex) => {
            const column = columns[colIndex];

            return (
              <TableCell
                key={colIndex}
                index={colIndex}
                style={{width: column.width}}
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
      </div>
    );
  }
}
