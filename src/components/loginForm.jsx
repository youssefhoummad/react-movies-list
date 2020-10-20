import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="w-50 m-auto">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

// const LoginForm = () => {
//   const [data, setData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});

//   const schema = {
//   username: Joi.string().required().label("Username"),
//   password: Joi.string().required().label("Password")
// };

//   const validate = () => {
//     const result = Joi.validate(data, schema, { abortEarly: false });
//     if (!result.error) return null;

//     const errors = {};
//     for (let item of result.error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   const validateProperty = ({ name, value }) => {
//     const obj = { [name]: value };
//     const schema_ = { [name]: schema[name] };
//     const { errors } = Joi.validate(obj, schema_);
//     return errors ? errors.details[0].message : null;
//   };

//   const handleSumbit = (e) => {
//     e.preventDefault();

//     const errors = validate();
//     setErrors(errors || {});
//     if (errors) return null;
//   };

//   const handleChange = ({ currentTarget: input }) => {
//     const errors_ = { ...errors };
//     const errorMessage = validateProperty(input);
//     if (errorMessage) errors_[input.name] = errorMessage;
//     else delete errors_[input.name];
//     setErrors(errors_);

//     const acc = { ...data };
//     acc[input.name] = input.value;
//     setData(acc);
//   };

//   return (
//     <div className="w-50 m-auto">
//       <h1>Login</h1>
//       <form>
//         <Input
//           name="username"
//           value={data.username}
//           label="Username"
//           onChange={handleChange}
//           autoFocus
//           error={errors.username}
//         />
//         <Input
//           name="password"
//           value={data.password}
//           label="Password"
//           onChange={handleChange}
//           typeProperty="password"
//           error={errors.password}
//         />
//         <button
//           onClick={handleSumbit}
//           type="submit"
//           className="btn btn-primary"
//         >
//           login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
