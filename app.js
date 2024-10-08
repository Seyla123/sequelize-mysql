const express = require('express');
const sequelize = require('./config/database');
const morgan = require('morgan');	
const AppError = require('./utils/appError');
const cors = require('cors')
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: true, // Reflect the request's origin
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

//Erorr Controller
const GlobalHandleError = require('./controllers/errorController');

// model 
//const User = require('./models/userModel');
// const email = ['sopheak1013@gmail.com,channarakluy@gmail.com,raksasparkle@gmail.com,sveitast7@gmail.com, seav.seyla0975634833@gmail.com,sokchanseiha@gmail.com, Mrrseyla.758@gmail.com, angkor.records.758@gmail.com raksasparkle@gmail.com']
// console.log(email);

// router
const userRoute = require('./routes/userRoutes');


app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
  });
  app.get('/', (req, res) => {
    res.send('Welcome to the Class API! Use /create-class to add a new class.');
  });
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(GlobalHandleError);

module.exports = app;