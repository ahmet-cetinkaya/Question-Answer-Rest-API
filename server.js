const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const routers = require('./routers');

// Enviroment Variables
dotenv.config({ path: './config/env/config.env' }); // Oto config klasörüne bakar, özel olarak belirtmek gerekise.
// MongoDB Connection
connectDatabase();

const PORT = process.env.PORT;
const app = express();

// Routers Middleware
app.use('/api/', routers);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} : ${process.env.NODE_ENV}`);
});
