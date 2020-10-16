import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Form</h1>
      <p>{match.params.id}</p>
      <button onClick={() => history.push("/movies")} className="btn btn-info">
        save
      </button>
    </div>
  );
};

export default MovieForm;
