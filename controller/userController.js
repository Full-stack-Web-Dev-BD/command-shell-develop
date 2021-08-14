const customValidator = require("../validator/customValidator");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const verify = customValidator.registerValidator(req);
  if (!verify.isValid) {
    return res.status(400).json(verify.error);
  }
  userModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ massage: "User existing !!!" });
    }
    bcrypt.hash(req.body.password, 13, (err, hash) => {
      if (err) {
        return res.status(500).json({ massage: "Server error !!!" });
      }
      new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .save()
        .then((user) => {
          res.status(200).json({ massage: "Register successfull !!" });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ massage: "Server error !!" });
        });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  let verify = customValidator.loginValidator(req);
  if (!verify.isValid) {
    return res.status(400).json(verify.err);
  }

  userModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ massage: "User not founded !!" });
    }
    bcrypt.compare(password, user.password, (err, success) => {
      if (err) {
        return res.status(500).json({ massage: "Servder error occurd" });
      }
      if (!success) {
        return res.status(400).json({ massage: "Wrong password provided!!" });
      }
      let token = jwt.sign(
        {
          type: user.type,
          name: user.name,
          email: user.email,
        },
        "st_app",
        { expiresIn: "4h" }
      );

      return res.status(200).json({ token: token });
    });
  });
};
const getSingleUser = (req, res) => {
  userModel
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ massage: "Bad request" });
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json({ massage: "Server error occurd " });
    });
};
const getAllUser = (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ massage: "server error occurd " });
    });
};
module.exports = {
  getAllUser,
  getSingleUser,
  register,
  login,
};
