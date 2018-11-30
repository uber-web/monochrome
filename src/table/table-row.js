import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export const STYLES = {
  row: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch'
  },
  cell: {
    flex: '0 0 auto',
    overflow: 'hidden',
    boxSizing: 'border-box',
    position: 'relative'
  }
};

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
    const {id, data, columns, style, renderCell} = this.props;

    return (
      <div className="mc-table--item" style={style}>
        <div className="mc-table--row" style={STYLES.row}>
          {data.data.map((colValue, colIndex) => {
            const column = columns[colIndex];
            const cellStyle = {
              ...STYLES.cell,
              width: column.width
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
      </div>
    );
  }
}
