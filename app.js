const express = require('express');
const sequelize = require('./utils/db');

const User = require('./models/userModel');

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello World!');
});
module.exports = app;