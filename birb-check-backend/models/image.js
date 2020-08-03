const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  author: { name: String },
  imageUrl: String,
});

ImageSchema.set('collection', 'images');

module.exports = mongoose.model('Images', ImageSchema);
