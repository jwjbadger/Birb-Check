const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
});

UserSchema.set('collection', 'posts');

module.exports.UserSchema = UserSchema;
module.exports.Users = mongoose.model('Users', UserSchema);
