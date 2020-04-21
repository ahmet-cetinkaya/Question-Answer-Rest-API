const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const routers = require('./routers');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');

/// Enviroment Variables
dotenv.config({ path: './config/env/config.env' }); // Oto config klasörüne bakar, özel olarak belirtmek gerekirse.

/// MongoDB Connection
connectDatabase();

/// Express
const PORT = process.env.PORT;
const app = express();

/// Routers Middleware
app.use('/api/', routers);

/// Error Handler
// app.use((err, req, res, next) => {
//   console.log('Custom Error Handle');
//   res.status(400).json({ success: false });
// });
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} : ${process.env.NODE_ENV}`);
});
