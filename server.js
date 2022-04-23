const express = require("express");
const app = express();
const connectToDatabase = require("./database/connect");
const routes = require("./routes/index");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

// mongo
connectToDatabase();
// Body Middleware
app.use(express.json());
// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  return console.log("Server Started");
});
