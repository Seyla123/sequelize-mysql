const dotenv = require('dotenv');
const { Sequelize ,DataTypes} = require('sequelize');

dotenv.config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 async function fetchAllClasses() {
  try {
    // Use sequelize.query to execute raw SQL
    const [results, metadata] = await sequelize.query('SELECT * FROM Class');
    
    console.log('All classes:', JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
}

fetchAllClasses();