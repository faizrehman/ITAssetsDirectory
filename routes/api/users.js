// Import required modules
const express = require("express");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Get DB Key From Config File
const keys = require("../../config/keys");

// Load User model and objects declaration
const router = express.Router();
const User = require("../../models/User");

// @route       POST api/users/register
// @desc        Register user route
// @access      Public
router.post("/register", (req, res) => {
  
  let errors = {};

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } 
    else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route       GET api/users/login
// @desc        Login User / Returning JWT token
// @access      Public
router.post("/login", (req, res) => {
  
  let errors = {};
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcryptjs.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: keys.sessionExpiryInSec
          },
          (err, token) => {
            res.json({
              // Return generated Token  
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route       GET api/users/current
// @desc        Return Current User
// @access      Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      msg: "Success",
      id: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;
