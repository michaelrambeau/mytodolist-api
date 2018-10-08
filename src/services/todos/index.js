const createTodoService = require("./todos-service");
const hooks = require("./todos-hooks");

function registerService({ app, path, Model }) {
  app.use(path, createTodoService({ Model }));
  app.service(path).hooks(hooks);
}

module.exports = registerService;
