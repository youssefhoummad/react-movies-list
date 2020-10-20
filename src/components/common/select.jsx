import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...rest} className="custom-select">
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <small class="form-text text-danger">* {error}</small>}
    </div>
  );
};

Select.defaultProps = {
  autoFocus: false,
  errors: null
};

export default Select;
