const express = require("express");
const dotenv = require("dotenv");

// Enviroment Variables
dotenv.config({ path: "./config/env/config.env" }); // Oto config klasörüne bakar, özel olarak belirtmek gerekise.
const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} : ${process.env.NODE_ENV}`);
});
