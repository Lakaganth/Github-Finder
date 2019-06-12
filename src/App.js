import "./App.css";

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context APi

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

//Componenets Imports
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";

import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import NotFound from "./components/pages/NotFound";

const App = () => {
  // const { users, loading, alert, user, repos } = this.state;
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="GitHub Finder" />
            <div className="container">
              <Alert />{" "}
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route exacts path="/user/:login" component={User} />} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
