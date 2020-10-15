import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "Title", order: "asc" }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "all" }, ...getGenres()]
    });
  }

  handleDelete = (m) => {
    const filterd = this.state.movies.filter((movie) => movie._id !== m._id);
    this.setState({ movies: filterd });
  };

  handlerLiked = (m) => {
    let movies = { ...this.state.movies };
    const index = this.state.movies.indexOf(m);
    if (m.liked) {
      m.liked = false;
    } else {
      m.liked = true;
    }
    movies[index] = { ...m };

    this.setState(movies);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handeleSelectItem = (item) => {
    this.setState({ currentGenre: item, currentPage: 1 });
  };

  handleSort = (path, order) => {
    this.setState({ sortColumn: { path, order } });
  };

  render() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in database</p>;
    }
    // the and operator && to verify is select genre because 'all' has no _id
    const filterd =
      this.state.currentGenre && this.state.currentGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre._id === this.state.currentGenre._id
          )
        : this.state.movies;

    const sorted = _.orderBy(
      filterd,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.currentGenre}
            onSelectItem={this.handeleSelectItem}
          />
        </div>
        <div className="col">
          <p>Showing {sorted.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLiked={this.handlerLiked}
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            // pass number of all filterd movies
            itemsCount={sorted.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
