import React, { useState } from "react";
import Navbar from "./Navbar";
import { Card, CardContent, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import DescriptionAlerts from "./Alert";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [errors, seterrors] = useState({});

  const [name, setName] = useState("");
  const [type, settype] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMassage, setsuccessMassage] = useState("");

  const onSubmit = () => {
    console.log(name, email, password, confirmPassword);
    let obj = { name, email, password, confirmPassword, type };
    Axios.post("/register", obj)
      .then((res) => {
        console.log(res.data.massage);
        setsuccessMassage(res.data.massage);
        toast(res.data.massage);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Request Faild !!");
        seterrors(err.response.data);
      });
  };
  return (
    <div>
      <Navbar title="Register Page" />
      <div className="col-md-6 offset-md-3 mt-5">
        <Card className="p-2">
          <h3 className="text-center ">Register Page.</h3>
          {successMassage ? (
            <DescriptionAlerts
              massage={successMassage}
              route="/login"
              routeText="Go to login Page"
            />
          ) : (
            ""
          )}
          <CardContent>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    name="name"
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    error={errors.name}
                    className="from-control"
                    id="standard-basic"
                    label="Name"
                  />
                  {errors.name ? (
                    <p className="text-danger"> {errors.name} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6">
                  <TextField
                    type="email"
                    name="email"
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
              </div>
              <div className="row">
                <div className="col-md-6">
                  <TextField
                    name="password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    error={errors.password}
                    className="from-control"
                    id="standard-basic"
                    label="Password"
                  />
                  {errors.password ? (
                    <p className="text-danger"> {errors.password} </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6">
                  <TextField
                    type="password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    error={errors.confirmPassword}
                    className="from-control"
                    id="standard-basic"
                    label="Confirm Password"
                  />
                  {errors.confirmPassword ? (
                    <p className="text-danger"> {errors.confirmPassword} </p>
                  ) : (
                    ""
                  )}
                </div>
                {errors.massage ? (
                  <p className="text-danger"> {errors.massage}</p>
                ) : (
                  ""
                )}
              </div>
            </form>
            <Button
              onClick={onSubmit}
              variant="contained"
              color="secondary"
              className="mt-5 mb-3"
            >
              Register
            </Button>
            <p>
              Already have account? Go to <Link to="/login">Login Page</Link>{" "}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
