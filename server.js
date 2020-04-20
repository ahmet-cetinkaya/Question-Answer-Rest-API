const express = require('express');
const dotenv = require('dotenv');
const question = require('./routers/questions');
const auth = require('./routers/auth');

// Enviroment Variables
dotenv.config({ path: './config/env/config.env' }); // Oto config klasörüne bakar, özel olarak belirtmek gerekise.
const PORT = process.env.PORT;
const app = express();

// Routers Middleware
app.use('/api/questions', question);
app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} : ${process.env.NODE_ENV}`);
});
