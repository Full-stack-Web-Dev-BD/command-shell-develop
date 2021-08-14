const validator = require("validator");
const registerValidator = (req) => {
  const { name, email, password, confirmPassword } = req.body;
  let error = {};
  console.log(req.body);
  if (!name) {
    error.name = "Name required !!";
  }
  if (!email) {
    error.email = "Email required !!";
  } else if (!validator.default.isEmail(req.body.email)) {
    error.email = "Email not valid!!";
  }
  if (!password) {
    error.password = "Password required !!";
  }
  if (!confirmPassword) {
    error.confirmPassword = "Confirm password  required !!";
  } else if (password !== confirmPassword) {
    error.confirmPassword = "Confirm  password does not match with password !!";
  }

  return {
    isValid: Object.keys(error).length === 0,
    error: error,
  };
};
const loginValidator = (req) => {
  let err = {};
  if (!req.body.email) {
    err.email = "Email required !!!";
  } else if (!validator.default.isEmail(req.body.email)) {
    err.email = "Email not valid";
  }
  if (!req.body.password) {
    err.password = "Password required !!!";
  }
  return {
    isValid: Object.keys(err).length === 0,
    err: err,
  };
};
module.exports = {
  loginValidator,
  registerValidator,
};
