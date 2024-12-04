var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var  userRouter = require('./routes/userRoutes');
var app = express();

const sequelize = require('./database');
const Connect = require('./model/Connect');

var connectRouter = require('./routes/connectRoutes');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/createConnect',connectRouter);
app.use('/userRouter',userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// async function startServer() {
//   await sequelize.sync({ alter: true });

//   try {
//     await sequelize.authenticate(); // Test the database connection
//     console.log('Database connection has been established successfully.');

//     // Start your server or perform other application logic
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// startServer();

// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);
//   });

const port = 3050;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
