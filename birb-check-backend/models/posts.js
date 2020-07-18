const mongoose = require('mongoose');
const UserSchema = require('./users').UserSchema;

const PostSchema = mongoose.Schema({
  author: UserSchema,
  title: String,
  description: String,
  comments: [{ author: UserSchema, body: String, points: Number }],
  points: Number,
});

PostSchema.set('collection', 'posts');

module.exports = mongoose.model('Posts', PostSchema);
