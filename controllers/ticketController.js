const catchAsync = require('./../utls/catchAsync');
const Ticket = require('./../models/ticketModel');
const authController = require('./../controllers/authController');
const User = require('./../models/userModel');

exports.bookTicket = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const newTicket = await Ticket.create(req.body);
  newTicket.startsAt.toUTCString();
  res.status(201).json({
    status: 'succes',
    data: {
      data: newTicket,
    },
  });
});

exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) {
    res.status(404).json({
      status: 'fail',
      message: 'data not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateTiming = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ticket) {
    res.status(404).json({
      status: 'fail',
      message: 'data not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: ticket,
    },
  });
});

exports.getAllTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find();
  res.status(200).json({
    status: 'success',
    result: tickets.length,
    data: {
      tickets,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);
  const user = await User.findById(ticket.user._id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getTicketsAtTime = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find({ $startsAt: req.body.startsAt });
  res.status(200).json({
    status: 'success',
    result: tickets.length,
    data: {
      tickets,
    },
  });
});

exports.getTicketCount = catchAsync(async (req, res, next) => {
  const stats = await Ticket.aggregate([
    {
      $match: { startsAt: req.body.startsAt },
    },
    {
      $group: {
        _id: null,
        numTicket: { $sum: 1 },
      },
    },
  ]);
  let result = stats.map((a) => a.numTicket);
  if (result[0] >= 20) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: 'houseful cant book anymore',
      },
    });
  } else {
    next();
  }
});
