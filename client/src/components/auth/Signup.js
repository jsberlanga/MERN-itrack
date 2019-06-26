import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: "Julio",
    email: "julio@email.com",
    password: "123qwe"
  });

  const { name, email, password } = formValues;

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post("/api/users/", newUser, config);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <h1>Sign up to your account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            placeholder="Enter your name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </label>
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
        <button>Signup</button>
      </form>
    </>
  );
};

export default Signup;
