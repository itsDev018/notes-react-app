const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {required: true, type:String,
             trim: true, unique: true}
}, {
  timestamps: true
});

module.exports = model('User', userSchema);
