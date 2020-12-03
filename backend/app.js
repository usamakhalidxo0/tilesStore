const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./routes/userRouter');

const globalErrorHandler = require('./controllers/errorHandler');

const app = new express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'build')));

app.use('/api/v1/users',userRouter);
app.get('/*',function(req,res,next){
    if(process.env.NODE_ENV == 'PROD')
    res.sendFile(path.join(__dirname,'build/index.html'));
    
});



app.use(globalErrorHandler);

module.exports = app;