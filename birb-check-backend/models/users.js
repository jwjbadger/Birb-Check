const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
});

UserSchema.set('collection', 'posts');

module.exports = mongoose.model('Users', UserSchema);
