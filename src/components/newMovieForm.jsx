import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const movieId = this.props.match.params.id;

    // must be movieId === "new", but is'nt work
    if (movieId === undefined) return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/404");

    this.setState({
      data: {
        _id: movie._id,
        title: movie.title,
        genre: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
  }

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().integer().min(1).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required()
  };

  doSubmit = () => {
    // Call the server
    console.log(this.state.data);

    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className="w-50 m-auto">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Tilte")}
          {this.renderSelect("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
