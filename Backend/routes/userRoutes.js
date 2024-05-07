const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;

  // validate user input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // create a new user
    const newUser = new User({ name, email, password: hash });

    // save the user to the database
    newUser.save((err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered successfully', user });
    });
  });
});


module.exports = router;
