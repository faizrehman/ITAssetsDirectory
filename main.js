// Import required modules
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

// Get DB Key From Config File
const db = require("./config/keys").mongoURI;

// Add routes and variable declaration
const users = require("./routes/api/users");
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);

// Listening Post
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
