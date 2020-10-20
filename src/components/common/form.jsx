import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
// import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.doSubmit();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

// const Form = ({ schema, doSubmit }) => {
//   const [data, setData] = useState({});
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const options = { abortEarly: false };
//     const { error } = Joi.validate(data, schema, options);
//     if (!error) return null;

//     const errors = {};
//     for (let item of error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   const validateProperty = ({ name, value }) => {
//     const obj = { [name]: value };
//     const _schema = { [name]: schema[name] };
//     const { error } = Joi.validate(obj, _schema);
//     return error ? error.details[0].message : null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const errors = validate();
//     setErrors(errors || {});
//     if (errors) return null;

//     doSubmit();
//   };

//   const handleChange = ({ currentTarget: input }) => {
//     const _errors = { ...errors };
//     const errorMessage = validateProperty(input);
//     if (errorMessage) _errors[input.name] = errorMessage;
//     else delete _errors[input.name];
//     setErrors(_errors);

//     const data = { ...data };
//     data[input.name] = input.value;
//     setData(data);
//   };

//   const renderInput = (name, label, type = "text") => {
//     return (
//       <Input
//         type={type}
//         name={name}
//         value={data[name]}
//         label={label}
//         onChange={handleChange}
//         error={errors[name]}
//       />
//     );
//   };
// };

// Form.defaultProps = {};

// export default Form;
