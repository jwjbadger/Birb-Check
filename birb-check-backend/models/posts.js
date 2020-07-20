const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  author: { name: String },
  title: String,
  description: String,
  comments: [
    {
      author: { name: String },
      body: String,
      upvotes: Array,
      downvotes: Array,
    },
  ],
  upvotes: Array,
  downvotes: Array,
});

PostSchema.set('collection', 'posts');

module.exports = mongoose.model('Posts', PostSchema);
