import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({});

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", credentials).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <>
      <form>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={handleChange} value={credentials.username} />
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" onChange={handleChange} value={credentials.password} />
        <input type="submit" value="Log In" onClick={handleLogin} />
      </form>
    </>
  );
};

export default Login;
