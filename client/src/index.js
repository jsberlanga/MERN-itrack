import React from "react";
import ReactDOM from "react-dom";
import IssueTrackerApp from "./components/IssueTrackerApp";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  mainLight: "#f2f6f5",
  mainDark: "#303D4B",
  grey: "#7A8795",
  lightGreen: "#c8dad3",
  darkGreen: "#93b5b3"
};

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }
  html {
    font-size: 10px;
  }
  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.7;
    font-size: 1.8rem;
    background: ${theme.mainLight};
    color: ${theme.mainDark};
  }
  a {
    text-decoration: none;
    color: ${theme.mainDark}
  }
  li {
    list-style-type: none;
  }
`;

const StyledPage = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: 80vw;
  margin: 0 auto;
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StyledPage>
      <GlobalStyle />
      <IssueTrackerApp />
    </StyledPage>
  </ThemeProvider>,
  document.getElementById("root")
);
