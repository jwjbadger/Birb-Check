const express = require('express');
const router = express.Router();

const Posts = require('../models/posts');
const UserSchema = require('../models/users').UserSchema;
const verify = require('../verify');

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

// Get Specific Post Route
router.get('/:_id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params._id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Post Route
router.post('/', async (req, res) => {
  if (
    verify.isEmptyOrSpaces(req.body.title) ||
    verify.isEmptyOrSpaces(req.body.description)
  ) {
    return res.status(400).json({ err: 'Put content in title and body' });
  }

  const post = new Posts({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    comments: req.body.comments,
    points: req.body.points,
  });

  try {
    const savedPost = await post.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Delete Route
router.delete('/:_id', async (req, res) => {
  try {
    const deletedStatus = await Posts.deleteOne({ _id: req.params._id });
    return res.status(200).json(deletedStatus);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Export
module.exports = router;
