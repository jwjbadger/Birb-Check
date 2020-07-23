const express = require('express');
const router = express.Router();

const Posts = require('../models/posts');
const UserSchema = require('../models/users').UserSchema;
const verify = require('../verify');
const posts = require('../models/posts');

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
    comments: [],
    upvotes: [req.body.author.name],
    downvotes: [],
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

// Patch Route
router.patch('/:_id', async (req, res) => {
  try {
    const updatedPost = await Posts.updateOne(
      { _id: req.params._id },
      { title: req.body.title, description: req.body.description },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Comments

// Post Comment (Patches Post)
router.post('/comments/:_id', async (req, res) => {
  try {
    const updatedPost = await Posts.updateOne(
      { _id: req.params._id },
      {
        $push: {
          comments: {
            author: req.body.author,
            body: req.body.body,
            upvotes: [req.body.author.name],
            downvotes: [],
          },
        },
      },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Patch Comment (Patches Post)
router.patch('/comments/:_id', async (req, res) => {
  try {
    const updatedPost = await Posts.update(
      { _id: req.params._id, 'comments._id': req.body.commentId },
      {
        $set: {
          'comments.$.body': req.body.body,
        },
      },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Comment (Patches Post)
router.delete('/comments/:_id', async (req, res) => {
  try {
    const updatedPost = await Posts.updateOne(
      { _id: req.params._id },
      {
        $pull: { comments: { _id: req.body.commentId } },
      },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Votes

// Upvote
router.patch('/vote/up/:_id', async (req, res) => {
  try {
    let post = await Posts.findById(req.params._id);

    if (
      post.upvotes.indexOf(req.body.voter) == -1 &&
      post.downvotes.indexOf(req.body.voter) == -1
    ) {
      post.upvotes.push(req.body.voter);
    } else {
      return res.status(400).json({ err: "Can't vote twice" });
    }

    const newPost = await Posts.updateOne({ _id: req.params._id }, post);

    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Downvote
router.patch('/vote/down/:_id', async (req, res) => {
  try {
    let post = await Posts.findById(req.params._id);

    if (
      post.upvotes.indexOf(req.body.voter) == -1 &&
      post.downvotes.indexOf(req.body.voter) == -1
    ) {
      post.downvotes.push(req.body.voter);
    } else {
      return res.status(400).json({ err: "Can't vote twice" });
    }

    const newPost = await Posts.updateOne({ _id: req.params._id }, post);

    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Remove Vote
router.patch('/vote/remove/:_id', async (req, res) => {
  try {
    let post = await Posts.findById(req.params._id);

    if (
      post.upvotes.indexOf(req.body.voter) == -1 &&
      post.downvotes.indexOf(req.body.voter) == -1
    ) {
      return res
        .status(400)
        .json({ err: 'You must vote before removing your vote' });
    } else {
      const downIndex = post.downvotes.indexOf(req.body.voter);
      const upIndex = post.upvotes.indexOf(req.body.voter);

      if (downIndex != -1) {
        post.downvotes.splice(downIndex, 1);
      } else if (upIndex != -1) {
        post.upvotes.splice(upIndex, 1);
      }
    }

    const newPost = await Posts.updateOne({ _id: req.params._id }, post);

    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Export
module.exports = router;
