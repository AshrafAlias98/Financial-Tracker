const router = require("express").Router();
let User = require("../models/userModel");

// User registration controller
router.route("/").post((req, res) => {
  let errors = {};

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmedPassword = req.body.confirmedPassword;

  const newUser = new User({ username, email, password });

  // TODO: Use JWT for authentication
  // TODO: Add encryption to password to be stored in DB

  // Validate the new user before he/she is populated in DB
  newUser.validate((err) => {
    if (err) {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].properties.message;
      });
    }

    if (password !== confirmedPassword) {
      // Check if password and confirmed password from user are the same
      errors.confirmedPassword = "Confirm password must match with password";
    }

    if (Object.keys(errors).length === 0) {
      newUser
        .save()
        .then(() => res.status(200).send("User registered!"))
        .catch((err) => {
          // Unique key duplication error
          const errInput = Object.keys(err.keyPattern)[0];
          errors[errInput] = `${errInput} is taken`;
          res.status(400).send(errors);
        });
    } else {
      res.status(400).send(errors); // Send collected input errors to front end
    }
  });
});

module.exports = router;
