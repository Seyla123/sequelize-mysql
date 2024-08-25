const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const app = require('./app');
// Endpoint to retrieve data from the Class table


const port = process.env.PORT || 3002;
//syncDatabase();
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(()=>{
//     process.exit(1);
//   });
// })