const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require(__basedir + "config/keys");
const passport = require("passport");
require("dotenv").config();

//-------------- MODELS -------------------
const User = require(__basedir + "db/models/user");
//------------- VALIDATION ----------------
const validateRegisterInput = require(__basedir +
  "helpers/validation/register");
const validateLoginInput = require(__basedir + "helpers/validation/login");

module.exports = {
  registerUser: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // If input is invalid set header status code to 400 && send errors obj
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find user where: email = email from body of post
    User.findOne({ email: req.body.email }).then(user => {
      // If user : email already exists...
      if (user) {
        // Create email property on errors obj
        errors.email = "Email already exists.";
        // Set header status to 400 (server error)
        // Send error object as json
        return res.status(400).json(errors);
      } else {
        // Create new User from model
        // Set respective properties on user to user's input from body of post
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        // Instantiate bcrypt obj
        // Run genSalt method of bcrypt (Creates a random string of characters = #, callback)
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          // Run hash method of bcrypt
          //  - Hash: takes passed string and replaces it with the generated salt while maintaining integrity of initial string
          //  - (string to be hashed, generated salt to pass to string, callback)
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            // Save new user to db then send it as a json
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => res.json(err));
          });
        });
      }
    });
  },
  loginUser: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // If input is invalid set header status code to 400 && send errors obj
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Set email and password to user input from form
    const email = req.body.email;
    const password = req.body.password;

    // Find one user by their email
    User.findOne({ email })
      .then(user => {
        // Check if user exists
        // If not set status to 404 && send errors object
        if (!user) {
          errors.email = "User not found.. Double check your email";
          return res.status(404).json(errors);
        }

        // Compare user created password to hashed password
        bcrypt.compare(password, user.password).then(isMatch => {
          // If hashed password matches user created password
          if (isMatch) {
            // Create JWT payload
            const payload = {
              id: user.id,
              name: user.name
            };

            // Assign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 1800 }, // Token expires in 30 minutes
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            return res.status(400).json({ password: "Password incorrect" });
          }
        });
      })
      .catch(err => res.send(err));
  },
  currentUser: (req, res) => {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      achievements: req.user.achievements,
      institutions: req.user.institutions
    });
  }
};
