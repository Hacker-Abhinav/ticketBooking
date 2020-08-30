const { promisify } = require('util');
const User = require('./../models/userModel');
const Ticket = require('./../models/userModel');
const catchAsync = require('./../utls/catchAsync');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  });
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.protectTo = catchAsync(async (req, res, next) => {
  //!) getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(404).json({
      status: 'fail',
      message: 'id and password did not match',
    });
  }
  //2))vrification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) check if user still exists

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    res.status(404).json({
      status: 'fail',
      message: 'user is not logged in',
    });
  }

  ///grant access to protected route
  req.user = freshUser;
  //console.log(req.user);
  next();
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) check if email and password exist
  if (!email || !password) {
    res.status(404).json({
      status: 'fail',
      message: 'user not found',
    });
  }
  //1) check if user exists and password correct

  const user = await User.findOne({ email }).select('+password');
  //console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(404).json({
      status: 'fail',
      message: 'id and password did not match',
    });
  }

  //3) if everything ok ,send token
  createSendToken(user, 200, res);
});
