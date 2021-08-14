import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardContent,
  TextField,
  CardHeader,
  CardActionArea,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [errors, seterrors] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    let obj = { email, password };
    Axios.post("/login", obj)
      .then((res) => {
        toast.success("Logging Success ! ");
        setTimeout(() => {
          console.log(res.data);
          window.localStorage.setItem("st_app", res.data.token);
          window.location.href = "/home";
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Request failed ! ");
        seterrors(err.response.data);
      });
  };
  return (
    <div>
      <Navbar title="Login Page" />
      <div className="col-md-6 offset-md-3 mt-5">
        <Card className="p-2">
          <h3 className="text-center ">Login Page.</h3>
          <CardContent>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    error={errors.email}
                    className="from-control"
                    id="standard-basic"
                    label="Email"
                  />
                  {errors.email ? (
                    <p className="text-danger"> {errors.email} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6">
                  <TextField
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    error={errors.password || errors.massage}
                    className="from-control"
                    id="standard-basic"
                    label="Password"
                  />
                  {errors.password ? (
                    <p className="text-danger"> {errors.password} </p>
                  ) : (
                    ""
                  )}
                  {errors.massage ? (
                    <p className="text-danger"> {errors.massage} </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
            <Button
              onClick={onSubmit}
              variant="contained"
              color="secondary"
              className="mt-5 mb-3"
            >
              Login
            </Button>
            <p>
              Not registered yet ? Go to{" "}
              <Link to="/register">Register Page</Link>{" "}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
