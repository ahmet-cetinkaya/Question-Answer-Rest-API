const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers');

// Enviroment Variables
dotenv.config({ path: './config/env/config.env' }); // Oto config klasörüne bakar, özel olarak belirtmek gerekise.
const PORT = process.env.PORT;
const app = express();

// Routers Middleware
app.use('/api/', routers);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} : ${process.env.NODE_ENV}`);
});
