import React from "react";
import Like from "./common/like";
import TableBody from "./common/tableBady";
import TableHeader from "./common/tableHeader";

const MoviesTable = ({ movies, onLike, onDelete, sortColumn, onSort }) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: (movie) => (
        <button className="btn btn-danger" onClick={() => onDelete(movie)}>
          delete
        </button>
      )
    }
  ];

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={movies} columns={columns} />
    </table>
  );
};

export default MoviesTable;
