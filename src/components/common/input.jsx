import React from "react";

const Input = ({ name, value, label, error, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        {...rest}
        className="form-control"
      />
      {error && <small className="form-text text-danger">* {error}</small>}
    </div>
  );
};

export default Input;
