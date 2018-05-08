# Table

A collection of React components that render very large tables.

## Usage

    import {Table} from 'monochrome';

    <Table columns={columns}
      rows={rows}
      renderHeader={renderHeader}
      renderCell={renderCell} />

## Table

Renders a table.

```js
import {Table} from 'monochrome';
```

### Props

- `columns` (Array) - list of column definitions. Each column definition may contain the following fields:
    + `name` (String) - display name of the column.
    + `type` (String) - `string`, `boolean`, etc.
- `rows` (Array) - list of rows to render. Each row object must contain the following fields:
    + `data` (Array) - value for each column, e.g. `[val1, val2, ...]`
- `renderHeader` (Function, optional) - custom renderer for each column's header. Receives one argument with the following fields:
    + `column` (Object) - the column definition
    + `columnIndex` (Number) - the column index
- `renderCell` (Function, optional) - custom renderer for each cell. Receives one argument with the following fields:
    + `value` (Object) - the cell value
    + `column` (Object) - the column definition
    + `columnIndex` (Number) - the column index
    + `row` (Object) - the row definition
    + `rowId` (String) - the row identifier
- `style` (Object, optional) - Additional style for the table container.


## TreeTable

Renders a table with nested hierarchy.

```js
import {TreeTable} from 'monochrome';
```

### Props

Inherits all `Table`'s props, and the following:

- `rows` (Array) - list of rows to render. Each row object must contain the following fields:
    + `data` (Array) - value for each column, e.g. `[val1, val2, ...]`
    + `children` (Array) - child rows
- `indentSize` (Number, optional) - Default `12`.

### CSS Classes

* `mc-table` - wrapper around the whole control
* `mc-table--header` - header of the table
* `mc-table--header-cell` - a cell in the header
* `mc-table--sort-icon` - the sorting indicator
* `mc-table--item` - wrapper around each top level item in the table
* `mc-table--row` - container of a row
* `mc-table--cell` - a cell in the table
* `mc-table--row-expander` - the expand/collapse button in tree table
