const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//const catchAsync = require('./../utls/catchAsync');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'an user must have a name'],
  },
  password: {
    type: String,
    required: [true, 'an user must have a password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'both password should match'],
  },
  name: {
    type: String,
    required: [true, 'an user must have a name'],
  },
  phone: {
    type: Number,
    required: [true, 'an user must have a phone'],
    minlength: 10,
  },
});

userSchema.pre('save', async function (next) {
  //only run this fxn if pssword is modified
  if (!this.isModified('password')) return next();
  //// HASH THE PASSWORD WITH COST OF 12
  this.password = await bcrypt.hash(this.password, 12);

  // TO DELETE PASSWORD CONFIRM
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
