import React, { Component, useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

const PAGE_SIZE = 4;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "Title", order: "asc" });

  // ComponentDidMount
  useEffect(() => {
    setMovies(getMovies());
    setGenres([{ name: "all" }, ...getGenres()]);
  }, []);

  const handleDelete = (m) => {
    const filterd = movies.filter((movie) => movie._id !== m._id);
    setMovies(filterd);
  };

  const handlerLiked = (m) => {
    let new_movies = [...movies];
    const index = new_movies.indexOf(m);
    if (m.liked) {
      m.liked = false;
    } else {
      m.liked = true;
    }
    new_movies[index] = { ...m };

    setMovies(new_movies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handeleSelectItem = (item) => {
    setCurrentGenre(item);
    setCurrentPage(1);
  };

  const handleSort = (path, order) => {
    setSortColumn({ path, order });
  };

  const getPageData = () => {
    const filterd =
      currentGenre && currentGenre._id
        ? movies.filter((movie) => movie.genre._id === currentGenre._id)
        : movies;

    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movies_page = paginate(sorted, currentPage, PAGE_SIZE);

    return { count: sorted.length, data: movies_page };
  };

  if (movies.length === 0) {
    return <p>There are no movies in database</p>;
  }

  const { count, data } = getPageData();
  // the and operator && to verify is select genre because 'all' has no _id

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
        <p>Showing {count} movies in the database</p>
        <MoviesTable
          movies={data}
          onDelete={handleDelete}
          onLike={handlerLiked}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Pagination
          // pass number of all filterd movies
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
// class Movies extends Component {
//   state = {
//     movies: [],
//     genres: [],
//     currentGenre: null,
//     pageSize: 4,
//     currentPage: 1,
//     sortColumn: { path: "Title", order: "asc" }
//   };

//   componentDidMount() {
//     this.setState({
//       movies: getMovies(),
//       genres: [{ name: "all" }, ...getGenres()]
//     });
//   }

//   handleDelete = (m) => {
//     const filterd = this.state.movies.filter((movie) => movie._id !== m._id);
//     this.setState({ movies: filterd });
//   };

//   handlerLiked = (m) => {
//     let movies = { ...this.state.movies };
//     const index = this.state.movies.indexOf(m);
//     if (m.liked) {
//       m.liked = false;
//     } else {
//       m.liked = true;
//     }
//     movies[index] = { ...m };

//     this.setState(movies);
//   };

//   handlePageChange = (page) => {
//     this.setState({ currentPage: page });
//   };

//   handeleSelectItem = (item) => {
//     this.setState({ currentGenre: item, currentPage: 1 });
//   };

//   handleSort = (path, order) => {
//     this.setState({ sortColumn: { path, order } });
//   };

//   render() {
//     if (this.state.movies.length === 0) {
//       return <p>There are no movies in database</p>;
//     }
//     // the and operator && to verify is select genre because 'all' has no _id
//     const filterd =
//       this.state.currentGenre && this.state.currentGenre._id
//         ? this.state.movies.filter(
//             (movie) => movie.genre._id === this.state.currentGenre._id
//           )
//         : this.state.movies;

//     const sorted = _.orderBy(
//       filterd,
//       [this.state.sortColumn.path],
//       [this.state.sortColumn.order]
//     );
//     const movies = paginate(
//       sorted,
//       this.state.currentPage,
//       this.state.pageSize
//     );

//     return (
//       <div className="row">
//         <div className="col-3">
//           <ListGroup
//             items={this.state.genres}
//             selectedItem={this.state.currentGenre}
//             onSelectItem={this.handeleSelectItem}
//           />
//         </div>
//         <div className="col">
//           <p>Showing {sorted.length} movies in the database</p>
//           <MoviesTable
//             movies={movies}
//             onDelete={this.handleDelete}
//             onLike={this.handlerLiked}
//             sortColumn={this.state.sortColumn}
//             onSort={this.handleSort}
//           />
//           <Pagination
//             // pass number of all filterd movies
//             itemsCount={sorted.length}
//             pageSize={this.state.pageSize}
//             currentPage={this.state.currentPage}
//             onPageChange={this.handlePageChange}
//           />
//         </div>
//       </div>
//     );
//   }
// }
