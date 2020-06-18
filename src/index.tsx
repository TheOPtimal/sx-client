import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Login from "./Pages/Login/Login";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/dashboard";
import Blacklisted from "./Pages/Blacklisted/blacklisted";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/blacklisted">
        <Blacklisted />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
