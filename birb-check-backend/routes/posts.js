const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Posts = require('../models/posts');
const Users = require('../models/users');
const verify = require('../verify');
// Routes

// Get Route
router.get('/', verify.verify, async (req, res) => {
  try {
    const posts = await Posts.find({});
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Get Specific Post Route
router.get('/:_id', verify.verify, async (req, res) => {
  try {
    const post = await Posts.findById(req.params._id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Post Route
router.post('/', verify.verify, async (req, res) => {
  if (
    verify.isEmptyOrSpaces(req.body.title) ||
    verify.isEmptyOrSpaces(req.body.description)
  ) {
    return res.status(400).json({ err: 'Put content in title and body' });
  }

  try {
    const user = await Users.findById(jwt.decode(req.header('auth-token'))._id);

    const post = new Posts({
      author: { name: user.name },
      title: req.body.title,
      description: req.body.description,
      comments: [],
      upvotes: [user.name],
      downvotes: [],
    });

    const savedPost = await post.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Delete Route
router.delete('/:_id', verify.verify, async (req, res) => {
  try {
    if (
      (await Users.findById(jwt.decode(req.header('auth-token'))._id)).name !==
      (await Posts.findById(req.params._id)).author.name
    ) {
      return res
        .status(401)
        .json({ err: "You aren't the author of this post" });
    }

    const deletedStatus = await Posts.deleteOne({ _id: req.params._id });
    return res.status(200).json(deletedStatus);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Patch Route
router.patch('/:_id', verify.verify, async (req, res) => {
  try {
    if (
      (await Users.findById(jwt.decode(req.header('auth-token'))._id)).name !==
      (await Posts.findById(req.params._id)).author.name
    ) {
      return res
        .status(401)
        .json({ err: "You aren't the author of this post" });
    }
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
router.post('/comments/:_id', verify.verify, async (req, res) => {
  try {
    const user = await Users.findById(jwt.decode(req.header('auth-token'))._id);

    const updatedPost = await Posts.updateOne(
      { _id: req.params._id },
      {
        $push: {
          comments: {
            author: { name: user.name },
            body: req.body.body,
            upvotes: [user.name],
            downvotes: [],
          },
        },
      },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Patch Comment (Patches Post)
router.patch('/comments/:_id', verify.verify, async (req, res) => {
  try {
    if (
      (await Users.findById(jwt.decode(req.header('auth-token'))._id)).name !==
      (
        await Posts.findOne(
          {
            _id: req.params._id,
            'comments._id': req.body.commentId,
          },
          'comments.$.body',
        )
      ).comments[0].author.name
    ) {
      return res
        .status(401)
        .json({ err: "You aren't the author of this comment" });
    }

    const updatedPost = await Posts.updateOne(
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
router.delete('/comments/:_id', verify.verify, async (req, res) => {
  if (
    (await Users.findById(jwt.decode(req.header('auth-token'))._id)).name !==
    (
      await Posts.findOne(
        {
          _id: req.params._id,
          'comments._id': req.body.commentId,
        },
        'comments.$.body',
      )
    ).comments[0].author.name
  ) {
    return res
      .status(401)
      .json({ err: "You aren't the author of this comment" });
  }

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

// Comment Votes

// Upvote
router.patch('/vote/comments/up/:_id', verify.verify, async (req, res) => {
  try {
    const comment = (
      await Posts.findOne(
        {
          _id: req.params._id,
          'comments._id': req.body.commentId,
        },
        'comments.$.body',
      )
    ).comments[0];
    const username = (
      await Users.findById(jwt.decode(req.header('auth-token'))._id)
    ).name;

    if (
      comment.upvotes.indexOf(username) !== -1 ||
      comment.downvotes.indexOf(username) !== -1
    ) {
      return res.status(400).json({ err: "Can't vote twice" });
    }
    const updatedPost = await Posts.updateOne(
      { _id: req.params._id, 'comments._id': req.body.commentId },
      {
        $push: {
          'comments.$.upvotes': username,
        },
      },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Downvote
router.patch('/vote/comments/down/:_id', verify.verify, async (req, res) => {
  try {
    const comment = (
      await Posts.findOne(
        {
          _id: req.params._id,
          'comments._id': req.body.commentId,
        },
        'comments.$.body',
      )
    ).comments[0];
    const username = (
      await Users.findById(jwt.decode(req.header('auth-token'))._id)
    ).name;

    if (
      comment.upvotes.indexOf(username) !== -1 ||
      comment.downvotes.indexOf(username) !== -1
    ) {
      return res.status(400).json({ err: "Can't vote twice" });
    }
    const updatedPost = await Posts.updateOne(
      { _id: req.params._id, 'comments._id': req.body.commentId },
      {
        $push: {
          'comments.$.downvotes': username,
        },
      },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Unvote
router.patch('/vote/comments/un/:_id', verify.verify, async (req, res) => {
  try {
    const comment = (
      await Posts.findOne(
        {
          _id: req.params._id,
          'comments._id': req.body.commentId,
        },
        'comments.$.body',
      )
    ).comments[0];
    const username = (
      await Users.findById(jwt.decode(req.header('auth-token'))._id)
    ).name;

    if (
      comment.upvotes.indexOf(username) === -1 &&
      comment.downvotes.indexOf(username) === -1
    ) {
      return res.status(400).json({ err: 'Please vote first before unvoting' });
    }
    const updatedPost = await Posts.updateOne(
      { _id: req.params._id, 'comments._id': req.body.commentId },
      {
        $pull: {
          'comments.$.upvotes': username,
          'comments.$.downvotes': username,
        },
      },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Votes

// Upvote
router.patch('/vote/up/:_id', verify.verify, async (req, res) => {
  try {
    let post = await Posts.findById(req.params._id);
    const user = await Users.findById(jwt.decode(req.header('auth-token'))._id);

    if (
      post.upvotes.indexOf(user.name) == -1 &&
      post.downvotes.indexOf(user.name) == -1
    ) {
      post.upvotes.push(user.name);
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
router.patch('/vote/down/:_id', verify.verify, async (req, res) => {
  try {
    let post = await Posts.findById(req.params._id);
    const user = await Users.findById(jwt.decode(req.header('auth-token'))._id);

    if (
      post.upvotes.indexOf(user.name) == -1 &&
      post.downvotes.indexOf(user.name) == -1
    ) {
      post.downvotes.push(user.name);
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
router.patch('/vote/remove/:_id', verify.verify, async (req, res) => {
  try {
    let post = await Posts.findById(req.params._id);
    const user = await Users.findById(jwt.decode(req.header('auth-token'))._id);

    if (
      post.upvotes.indexOf(user.name) == -1 &&
      post.downvotes.indexOf(user.name) == -1
    ) {
      return res
        .status(400)
        .json({ err: 'You must vote before removing your vote' });
    } else {
      const downIndex = post.downvotes.indexOf(user.name);
      const upIndex = post.upvotes.indexOf(user.name);

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
