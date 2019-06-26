import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .navbar__links {
    display: flex;
    li {
      padding: 0 3rem;
    }
    li:hover {
      font-weight: bold;
      transform: scale(1.05);
    }
  }
`;

const Navbar = () => {
  return (
    <StyledNav>
      <h1 className="logo">
        <Link to="/">Issue Tracker</Link>
      </h1>
      <ul className="navbar__links">
        <li>
          <Link to="/issues">Create an issue</Link>
        </li>
        <li>
          <Link to="/signin">Signin</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Navbar;
