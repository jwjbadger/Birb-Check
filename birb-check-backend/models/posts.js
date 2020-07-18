const mongoose = require('mongoose');
const UserSchema = require('./users').UserSchema;

const PostSchema = mongoose.Schema({
  author: { name: String },
  title: String,
  description: String,
  comments: [{ author: { name: String }, body: String, points: Number }],
  points: Number,
});

PostSchema.set('collection', 'posts');

module.exports = mongoose.model('Posts', PostSchema);
