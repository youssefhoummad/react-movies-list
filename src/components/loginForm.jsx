import React, { useState } from "react";
import Input from "./common/input";

const LoginForm = () => {
  const [account, setAccount] = useState({ username: "", password: "" });

  const onSumbit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const acc = { ...account };
    acc[e.currentTarget.name] = e.currentTarget.value;
    setAccount(acc);
  };

  return (
    <div className="w-50 m-auto">
      <h1>Login</h1>
      <form>
        <Input
          name="username"
          value={account.username}
          label="Username"
          onChange={handleChange}
          autoFocus
        />
        <Input
          name="password"
          value={account.password}
          label="Password"
          onChange={handleChange}
          typeProperty="password"
        />
        <button onClick={onSumbit} type="submit" className="btn btn-primary">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
