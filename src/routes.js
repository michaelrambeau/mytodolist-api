const registerToDoService = require("./services/todos");
const statusService = require("./services/status/status-service");

function setupRoutes({ app, Model }) {
  app.use("/status", statusService);
  registerToDoService({ app, path: "/todos", Model });
}

module.exports = setupRoutes;
