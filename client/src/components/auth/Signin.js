import React, { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [formValues, setFormValues] = useState({
    email: "julio@email.com",
    password: "123qwe"
  });

  const { email, password } = formValues;

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const loginUser = {
      email,
      password
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post("/api/auth", loginUser, config);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </label>
        <button>Signin</button>
      </form>
    </>
  );
};

export default Signin;
