const User = require('../models/userModel');
exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      data: docs,
    },
  });
};
