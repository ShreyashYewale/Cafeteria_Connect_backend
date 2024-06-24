const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const { errors } = require("formidable");
var jwt = require("jsonwebtoken");

//Signup Controller
exports.signup = (req, res) => {
  const errors = validationResult(req); //Checking if there are any errors in model validation rules

  if (!errors.isEmpty())
    return res.status(422).json({ error: errors.array()[0].msg });
  const user = new User(req.body);

  console.log("USER", user);
  user.save((err, user) => {
    //save method to save the user in DB
    if (err) {
      return res.status(400).json({ err: "NOT able to save user in DB" });
    }
    res.json(user);
  });
};

//Signin Controller
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body; //Extracting the email and password from the body part

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    //Finding the user based on email
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        error: "Incorrect Password",
      });
    }

    // Creating JWT web token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user; //Passing the info to frontend so we will get name,role to redirect appropriately
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//Signout Controller
exports.signout = (req, res) => {
  res.clearCookie("token"); //Clearing the cookie so the user gets signout
  res.json({
    message: "User Signout Successfully",
  });
};
