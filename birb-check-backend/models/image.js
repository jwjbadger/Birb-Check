const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  author: { name: String },
  image: String,
});

PostSchema.set('collection', 'images');

module.exports = mongoose.model('Images', ImageSchema);
