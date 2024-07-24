var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");
const { signup, signin, signout } = require("../controllers/auth");

//Route for Signup
router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "Password should be atleast 3 character").isLength({
      min: 3,
    }),
  ],

  signup
);

//Route for Signin
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "Password field is required").isLength({ min: 1 }),
  ],
  signin
);

//Route for Signout
router.get("/", signout);

module.exports=router;
