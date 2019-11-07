const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes");
const helpers = require("./helpers");

dotenv.config();
const { NODE_ENV } = process.env;

// Connect db
(async () => {
  const DB_PARAMS = { useNewUrlParser: true, useUnifiedTopology: true };
  const MONGO_URI =
    NODE_ENV === "test"
      ? "mongodb://localhost/recipeTEST"
      : "mongodb://localhost/recipe";

  await mongoose.connect(MONGO_URI, DB_PARAMS);

  if (NODE_ENV !== "test") {
    console.info("DB connected");
  }
})();

// Initialize application
const app = express();

// Middlewares
if (!NODE_ENV === "test") app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api/recipes", routes.recipes);

// Handle errors
app.use(helpers.handleErrors);

module.exports = app;
