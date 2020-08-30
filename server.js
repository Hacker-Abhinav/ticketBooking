const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app.js');
//console.log(app.get('env'));

//console.log(process.env);
const DB = process.env.database.replace(
  '<password>',
  process.env.database_password
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database is connected');
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('app is running and kicking....');
});
