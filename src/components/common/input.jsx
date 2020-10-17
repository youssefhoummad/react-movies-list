import React from "react";

const Input = ({ name, value, label, onChange, typeProperty, autoFocus }) => {
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
    </div>
  );
};

Input.defaultProps = {
  typeProperty: "text",
  autoFocus: false
};

export default Input;
