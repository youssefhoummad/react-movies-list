import React from "react";
import TableBody from "./tableBady";
import TableHeader from "./tableHeader";

const Table = ({ data, columns, sortColumn, onSort, onLike, onDelete }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
