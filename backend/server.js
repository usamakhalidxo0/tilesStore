const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path:path.join(`${__dirname}`,'.env')

});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err);
    process.exit(1);
  });

const DB = process.env.DATABASE;

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => console.log('DB connection successful!'))
.catch(function(err){
  console.log(err);
});

const app = require('./app');

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`listening to port ${port}`);
})