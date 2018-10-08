// const Model = require("./todos-model");
const MongooseService = require("feathers-mongoose").Service;

function createToDoService({ Model }) {
  const service = new MongooseService({
    Model,
    lean: true, // set to false if you want Mongoose documents returned
    paginate: {
      default: 2,
      max: 20
    }
  });
  return service;
}

module.exports = createToDoService;
