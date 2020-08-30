const express = require('express');
const ticketController = require('./../controllers/ticketController');
const authController = require('./../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(
    authController.protectTo,
    ticketController.getTicketCount,
    ticketController.bookTicket
  )
  .get(ticketController.getTicketsAtTime);
router
  .route('/:id')
  .delete(ticketController.deleteTicket)
  .patch(ticketController.updateTiming)
  .get(ticketController.getUser);

module.exports = router;
