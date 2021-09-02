const router = require("express").Router();
let User = require("../models/userModel");

// User registration controller
router.route("/:username").get((req, res) => {
  let error = "Username could not be found";
  User.findOne({ username: req.params.username })
    .then((users) => {
      if (users == null) {
        throw error;
      } else {
        res.status(200).send(users);
      }
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
