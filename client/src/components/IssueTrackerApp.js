import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./globals/Navbar";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";

const IssueTrackerApp = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
    </Switch>
  </BrowserRouter>
);

export default IssueTrackerApp;
