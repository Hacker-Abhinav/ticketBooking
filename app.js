const path = require('path');
const express = require('express');
//const AppError = require('./utls/appError');
//const morgan = require('morgan');
//const globalErrorHandler = require('./controllers/errorController');
const app = express();
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');

//middlewares....
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

///mount Routers

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);

module.exports = app;
