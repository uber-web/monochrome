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

- `width` **(string|number, optional)** - Width of the table. Default `100%`.
- `height` **(string|number, optional)** - Height of the table. Default `400`.
- `columns` **(array)** - list of column definitions. Each column definition may contain the following fields:
    + `name` **(string)** - display name of the column.
    + `type` **(string)** - `string`, `boolean`, etc.
- `rows` **(array)** - list of rows to render. Each row object must contain the following fields:
    + `data` **(array)** - value for each column, e.g. `[val1, val2, ...]`
- `renderHeader` **(function, optional)** - custom renderer for each column's header. Receives one argument with the following fields:
    + `column` **(object)** - the column definition
    + `columnIndex` **(number)** - the column index
- `renderCell` **(function, optional)** - custom renderer for each cell. Receives one argument with the following fields:
    + `value` **(object)** - the cell value
    + `column` **(object)** - the column definition
    + `columnIndex` **(number)** - the column index
    + `row` **(object)** - the row definition
    + `rowId` **(string)** - the row identifier


## TreeTable

Renders a table with nested hierarchy.

```js
import {TreeTable} from 'monochrome';
```

### Props

Inherits all `Table`'s props, and the following:

- `rows` **(array)** - list of rows to render. Each row object must contain the following fields:
    + `data` **(array)** - value for each column, e.g. `[val1, val2, ...]`
    + `children` **(array)** - child rows
- `indentSize` **(number, optional)** - Default `12`.

### CSS Classes

* `mc-table` - wrapper around the whole control
* `mc-table--header` - header of the table
* `mc-table--header-cell` - a cell in the header
* `mc-table--sort-icon` - the sorting indicator
* `mc-table--item` - wrapper around each top level item in the table
* `mc-table--row` - container of a row
* `mc-table--cell` - a cell in the table
* `mc-table--row-expander` - the expand/collapse button in tree table
