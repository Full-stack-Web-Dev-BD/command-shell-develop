import React, { Component } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./Component/util/PublicRoute";
import ProtectedRoute from "./Component/util/ProtectedRoute";
import Home from "./Component/ProtectedComponent/Home";
import Login from "./Component/PublicComponent/Login";
import Register from "./Component/PublicComponent/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer autoClose="1500" />
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/home" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <Redirect from="/" to="/home" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
