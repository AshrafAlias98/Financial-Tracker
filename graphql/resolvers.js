const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { JWT_SECRET } = require("../config/env.json");

module.exports = {
  Query: {
    getUsers: async (_, __, context) => {
      try {
        let user;
        if (context.req && context.req.headers.authorization) {
          const token = context.req.headers.authorization.split(" ")[1];
          console.log(token);
          jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
              throw new AuthenticationError("Unauthenticated");
            }

            user = decodedToken;

            console.log(user);
          });
        }

        const users = await User.findAll();
        return users;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};

      try {
        // Validate that the inputs from user are not empty
        if (username.trim() === "") {
          errors.username = "Username must not be empty";
        }
        if (password === "") {
          errors.password = "Password must not be empty";
        }

        // Throw error if any
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad input", { errors });
        }

        const user = await User.findOne({ where: { username: username } }); // Find the user's entry by username

        if (user === null) {
          errors.username = "User not found";
          throw new UserInputError("User not found", { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password); // Check the password input with stored password

        if (!correctPassword) {
          errors.password = "Password is incorrect";
          throw new AuthenticationError("Password is incorrect", { errors });
        }

        // Provide user with a authentication token that is signed from our server
        const token = jwt.sign({ username }, JWT_SECRET, {
          expiresIn: 60 * 60,
        });

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  Mutation: {
    // User registration
    register: async (_, args) => {
      let { username, email, password, confirmedPassword } = args;
      let errors = {}; // Store all the errors caught as object to throw later

      try {
        // Validate empty input data
        if (username.trim() === "") {
          errors.username = "Username must not be empty";
        }
        if (email.trim() === "") {
          errors.email = "Email must not be empty";
        }
        if (password.trim() === "") {
          errors.password = "Password must not be empty";
        }
        if (confirmedPassword.trim() === "") {
          errors.confirmedPassword = "Confirm password must not be empty";
        }

        // Validate password and confirmed password is the same
        if (password !== confirmedPassword) {
          errors.confirmedPassword =
            "Confirm password must match with password";
        }

        // IMPORTANT NOTE: This method below can also be used to check if user alrdy exist in the DB
        //                 but it is less efficient due to querying the DB twice. Instead, we
        //                 leverage the existance of unique key constrain error in the DB for
        //                 our validation

        // Check if username / email exists
        // const userByUsername = await User.findOne({
        //   where: { username: username },
        // });
        // const userByEmail = await User.findOne({ where: { email: email } });

        // if (userByUsername !== null) {
        //   errors.username = "Username is taken";
        // }
        // if (userByEmail !== null) {
        //   errors.email = "Email is taken";
        // }

        // Throw the errors if object is not empty
        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        // Hash password
        password = await bcrypt.hash(password, 6);

        // Create user
        const user = await User.create({
          username: username,
          email: email,
          password: password, // There is no point to store confirmedPassword as it would be the same
          //                     as password (which is validated above to be the same anyway)
        });

        // Return user
        return user;
      } catch (err) {
        // Using SQL unique key constraint to validate existing users (Without querying to DB)
        if (err.name === "SequelizeUniqueConstraintError") {
          err.errors.forEach(
            (e) =>
              (errors[e.path.split(".")[1]] = `${
                e.path.split(".")[1]
              } is already taken`)
          );
        } else if (err.name === "SequelizeValidationError") {
          err.errors.forEach((e) => (errors[e.path] = e.message));
        }
        console.log(err);
        throw new UserInputError("Bad input", { errors });
      }
    },
  },
};
