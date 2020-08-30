const mongoose = require('mongoose');
const validator = require('validator');
//const User = require('./userModel');
const ticketSchema = new mongoose.Schema(
  {
    startsAt: {
      type: Date,
      default: Date.now(),
      required: [true, 'must give an starting time'],
    },
    name: {
      type: String,
    },
    expiresAt: {
      type: Date,
      default: Date.now() + 8 * 60 * 60 * 1000,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ticketSchema.virtual('endsAt').get(function () {
  return (this.startsAt += 2 * 60 * 60 * 1000);
});

ticketSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
