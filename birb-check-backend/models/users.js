const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  password: String,
});

UserSchema.set('collection', 'users');

module.exports = mongoose.model('Users', UserSchema);
