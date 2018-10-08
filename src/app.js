const cors = require("cors");
const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");

const setupRoutes = require("./routes");

function createApp({ Model }) {
  const app = express(feathers());
  // Turn on JSON parser for REST services
  app.use(express.json());
  // Turn on URL-encoded parser for REST services
  app.use(express.urlencoded({ extended: true }));
  // Enable REST services
  app.configure(express.rest());
  app.use(cors());
  setupRoutes({ app, Model });

  // Error handling middleware, must be applied at the end, convert error to JSON messages, send the right error HTTP code
  app.use(express.errorHandler());
  return app;
}

module.exports = createApp;
