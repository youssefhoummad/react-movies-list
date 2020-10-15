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

  const renderSortIcon = (col) => {
    if (col.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            className="clickable"
            key={col.path || col.key}
            onClick={() => raiseSort(col.path)}
          >
            {col.label} {renderSortIcon(col)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
