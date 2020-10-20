import React from "react";
import "./styles.css";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Rentals from "./components/rentals";
import Customers from "./components/Customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import NewMovieForm from "./components/newMovieForm";

export default function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main role="main" className="container">
        <Switch>
          <Route path={"/register"} component={RegisterForm} />
          <Route path={"/login"} component={LoginForm} />
          {/* <Route path={"/movies/new"} component={NewMovieForm} /> */}
          <Route path={"/movies/:id"} component={MovieForm} />
          <Route path={"/movies"} component={Movies} />
          <Route path={"/customers"} component={Customers} />
          <Route path={"/rentals"} component={Rentals} />
          <Route path={"/404"} component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/404" />
        </Switch>
      </main>
    </React.Fragment>
  );
}
