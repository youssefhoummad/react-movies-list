import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

export default class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

  handeleDelete = (m) => {
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
  render() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in database</p>;
    }

    const movies = paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onLiked={() => this.handlerLiked(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handeleDelete(movie)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}
