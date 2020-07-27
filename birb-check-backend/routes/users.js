const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const verify = require('../verify');

// Login
router.post('/login', async (req, res) => {
  // Get from database
  const user = await User.findOne({ name: req.body.name });
  if (user == null)
    return res.status(400).json({ err: 'Invalid username/password' });

  // Valid Name & Password
  if (
    verify.isEmptyOrSpaces(req.body.name ? req.body.name : '') ||
    verify.isEmptyOrSpaces(req.body.password ? req.body.password : '')
  ) {
    return res.status(400).json({
      err: 'Invalid username/password',
    });
  }

  // Password check
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ err: 'Invalid username/password' });

  // JWT
  const token = jwt.sign({ _id: user._id }, process.env.token);
  res.header('auth-token', token).json({ token: token });
});

// Register
router.post('/register', async (req, res) => {
  // Validate unique username
  const userCheck = await User.findOne({ name: req.body.name });
  if (userCheck != null) {
    return res.status(400).json({
      err: 'Username already in use',
    });
  }

  if (
    verify.isEmptyOrSpaces(req.body.name) ||
    verify.isEmptyOrSpaces(req.body.password)
  ) {
    return res.status(400).json({
      err: 'Invalid username/password',
    });
  }

  // Generate Salt
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Get user from input
  const user = new User({
    name: req.body.name,
    password: hashPassword,
  });

  // Save to the database
  try {
    const savedUser = await user.save();
    res.status(200).json({
      _id: savedUser._id,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Export
module.exports = router;
