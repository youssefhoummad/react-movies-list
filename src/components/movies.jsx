import React, { useState } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Input from "./common/input";
import useDatabase from "../services/useDatabase";
import { database } from "../firebase";
const PAGE_SIZE = 4;

const Movies = () => {
  const [currentGenre, setCurrentGenre] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "Title", order: "asc" });
  const [search, setSearch] = useState("");

  const { docs: movies } = useDatabase("movies");
  const { docs: genres } = useDatabase("genres");

  const handleDelete = (m) => {
    database.collection("movies").doc(m._id).delete();
  };

  const handlerLiked = (m) => {
    if (m.liked) {
      database.collection("movies").doc(m._id).update({ liked: false });
    } else {
      database.collection("movies").doc(m._id).update({ liked: true });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handeleSelectItem = (item) => {
    setCurrentGenre(item);
    setCurrentPage(1);
    setSearch("");
  };

  const handleSort = (path, order) => {
    setSortColumn({ path, order });
  };

  const handleSearch = ({ currentTarget: input }) => {
    setCurrentGenre({ name: "all" });
    setCurrentPage(1);
    setSearch(input.value);
  };

  const getPageData = () => {
    let filterd;
    if (!search) {
      filterd =
        currentGenre && currentGenre._id
          ? movies.filter((movie) => movie.genre._id === currentGenre._id)
          : movies;
    } else {
      filterd = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movies_page = paginate(sorted, currentPage, PAGE_SIZE);

    return { count: sorted.length, data: movies_page };
  };

  if (movies.length === 0) {
    return <p>There are no movies in database</p>;
  }

  const { count, data } = getPageData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={currentGenre}
          onSelectItem={handeleSelectItem}
        />
      </div>
      <div className="col">
        <Link to="/movies/new" className="btn btn-primary mt-2">
          New movie
        </Link>
        <Input
          value={search}
          name="search"
          placeholder="search..."
          onChange={handleSearch}
        />
        <p className="mt-2">Showing {count} movies in the database</p>
        <MoviesTable
          movies={data}
          onDelete={handleDelete}
          onLike={handlerLiked}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={count}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
