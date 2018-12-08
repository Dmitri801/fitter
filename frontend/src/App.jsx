import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Landing from "./components/pages/Landing.jsx";
import Register from "./components/pages/Register.jsx";
import Home from "./components/pages/Home.jsx";
import Layout from "./components/HOC/Layout.jsx";

import RequireAuth from "./components/HOC/RequireAuth.jsx";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={RequireAuth(Home)} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
