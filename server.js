const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database-1.cvk2g82gk1s1.us-east-2.rds.amazonaws.com', 'admin', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });

