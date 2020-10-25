import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie } from "../services/fakeMovieService";
import { database } from "../firebase";
import useDatabase, { useDatabase2 } from "../services/useDatabase";
import Input from "./common/input";
import Select from "./common/select";
// import { getGenres } from "../services/fakeGenreService";

const MovieForm = ({ match, history }) => {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: ""
  });

  const [errors, setErrors] = useState([]);
  const { docs: genres } = useDatabase("genres");
  const { doc: movie } = useDatabase2("movies", match.params.id);

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
    liked: Joi.boolean()
  };

  useEffect(() => {
    if (match.params.id === "new") return;
    if (!movie) return history.replace("/404");

    setData({
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genreId,
      liked: movie.liked
    });
  }, [movie, match.params.id, history]);

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaP = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaP);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    doSubmit();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
  };
  const handleChange = ({ currentTarget: input }) => {
    const error = { ...errors };
    const errorMessage = validateProperty(input);

    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const _data = { ...data };
    _data[input.name] = input.value;

    setData(_data);
    setErrors(errors);
  };

  const doSubmit = () => {
    const genre = genres.find((g) => g._id === data.genreId);
    const movie = { ...data };
    delete movie._id;
    movie.genre = genre;

    if (match.params.id !== "new") {
      database.collection("movies").doc(data._id).update(movie);
    } else {
      movie.liked = false;

      database.collection("movies").add(movie);
    }
    history.push("/movies");
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderButton = (label) => {
    return (
      <button disabled={validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  return (
    <div className="w-50 m-auto">
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Tilte")}
        {renderSelect("genreId", "Genre", genres)}
        {renderInput("numberInStock", "Stock", "number")}
        {renderInput("dailyRentalRate", "Rate")}
        {renderButton("Save")}
      </form>
    </div>
  );
};

class MovieForm2 extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [
      { _id: "wiCauuUngGBlmeUUPEhe", name: "Action" },
      { _id: "RbCZbNEAhd6Vbo2sg8Tw", name: "Comedy" },
      { _id: "lZHXduyQHhuaq48OQlBd", name: "Thriller" },
      { _id: "GK4U0DeUrv3UBQu6p2jm", name: "Romance" }
    ],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    // this.setState({ genres: getGenres() });

    const movieId = this.props.match.params.id;

    if (movieId === "new") return;

    const movie = database.collection("movies").doc(movieId).get();
    if (!movie) return this.props.history.replace("/404");

    console.log("form componentDidMount: ", movie);

    this.setState({
      data: {
        _id: movie._id,
        title: movie.title,
        // genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className="w-50 m-auto">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Tilte")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
