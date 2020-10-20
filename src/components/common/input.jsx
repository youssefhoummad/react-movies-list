import React from "react";

const Input = ({
  name,
  value,
  label,
  error,
  onChange,
  typeProperty,
  autoFocus
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        type={typeProperty}
        autoFocus={autoFocus}
        className="form-control"
      />
      {error && <small className="form-text text-danger">* {error}</small>}
    </div>
  );
};

Input.defaultProps = {
  typeProperty: "text",
  autoFocus: false,
  errors: null
};

export default Input;
