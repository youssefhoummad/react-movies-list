import React from "react";
import Like from "./common/like";
import TableBody from "./common/tableBady";
import TableHeader from "./common/tableHeader";

const MoviesTable = ({ movies, onLiked, onDelete, sortColumn, onSort }) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];

  return (
    <table className="table table-bordered">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <tbody>
        <TableBody data={movies} columns={columns} />
      </tbody>
    </table>
  );
};

export default MoviesTable;
