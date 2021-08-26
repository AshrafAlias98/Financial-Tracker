const router = require("express").Router();
let User = require("../models/userModel");

// User registration controller
router.route("/add").post((req, res) => {
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

      // Check if password and confirmed password from user are the same
      if (password !== confirmedPassword) {
        errors.confirmedPassword = "Confirm password must match with password";
      }

      res.status(400).send(errors); // Send collected input errors to front end
    } else {
      newUser
        .save()
        .then(() => res.json("User registered!"))
        .catch((err) => {
          // TODO: Update to send to front end
          console.log(err);
        });
    }
  });
});

module.exports = router;
