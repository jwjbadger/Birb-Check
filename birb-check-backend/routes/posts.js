const express = require('express');
const router = express.Router();

const Posts = require('../models/posts');

// Routes

// Get Route
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find({});
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Export
module.exports = router;
