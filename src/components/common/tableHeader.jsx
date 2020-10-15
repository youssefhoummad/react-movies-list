import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    let order = "asc";
    if (path === sortColumn.path) {
      if (sortColumn.order === order) {
        order = "desc";
      }
    }

    onSort(path, order);
  };
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.path || col.key} onClick={() => raiseSort(col.path)}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
