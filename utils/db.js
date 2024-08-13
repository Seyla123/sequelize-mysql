const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
    host: process.env.DB_HOST,
    dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
const connection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');


    // Sync all models
        await sequelize.sync({ force: true }); // `force: false` prevents dropping tables if they already exist
        console.log('All models were synchronized successfully.');

      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connection();

module.exports = sequelize;