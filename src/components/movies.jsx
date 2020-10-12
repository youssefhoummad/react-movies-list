import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

export default class Movies extends Component {
  state = { movies: getMovies() };

  handeleDelete = (m) => {
    const filterd = this.state.movies.filter((movie) => movie._id !== m._id);
    this.setState({ movies: filterd });
  };

  render() {
    if (this.state.movies.length === 0) {
      return <p>There are no movies in database</p>;
    } else {
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
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie) => (
                <tr key={movie._id}>
                  <th scope="row">{movie.title}</th>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
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
        </React.Fragment>
      );
    }
  }
}
