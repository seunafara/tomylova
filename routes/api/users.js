const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require('../../models/User');

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */

router.post('/register', (req, res) => {
  let { name, username, email, password, confirm_password } = req.body;

  if (!name || !username || !email || !password || !confirm_password) {
    return res.status(400).json({
      message: 'Fill All Required Fields',
    });
  }

  if (password !== confirm_password) {
    return res.status(400).json({
      message: 'Passwords do not match',
    });
  }

  // Check for unique username
  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: 'Username is already taken',
      });
    }
  });

  // Check for unique email
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: 'Email is already registered. Please login',
      });
    }
  });

  // The data is valid and now we can register user
  let newUser = new User({
    name,
    username,
    password,
    email,
  });
  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        return res.status(200).json({
          success: true,
          message: 'User is now registered.',
        });
      });
    });
  });
});

/**
 * @route POST api/users/login
 * @desc Login the user
 * @access Public
 */
router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!req.body.password || !req.body.username) {
      return res.status(400).json({
        message: 'Please fill all fields',
        success: false,
      });
    }
    if (!user) {
      return res.status(404).json({
        message: 'Username not found',
        success: false,
      });
    }

    // If there is user we compare the password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // User's password is correct and we need to send the JSON Token for user
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        //omit user password
        var userObj = user.toObject();
        delete userObj.password;
        //end
        jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
          res.status(200).json({
            success: true,
            user: userObj,
            token: `Bearer ${token}`,
            message: 'You are now logged in',
          });
        });
      } else {
        return res.status(404).json({
          message: 'Incorrect password',
          success: false,
        });
      }
    });
  });
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);
module.exports = router;
