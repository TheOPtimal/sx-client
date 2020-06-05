import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./Pages/Login/Login";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/dashboard";
import Blacklisted from "./Pages/Blacklisted/blacklisted";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/blacklisted"><Blacklisted /></Route>
        <Route path="/dashboard"><Dashboard /></Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
