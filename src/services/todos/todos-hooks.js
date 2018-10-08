const debug = require("debug")("api");

module.exports = {
  before: {
    /*
    Hook used to handle search by title feature
    */
    find(context) {
      const {
        params: { query }
      } = context;
      const { search, ...otherProps } = query;
      if (!query.$sort) query.$sort = "-created_at";
      if (search) {
        const updatedQuery = {
          ...otherProps,
          title: {
            $regex: new RegExp(search)
          }
        };
        debug("Search query", updatedQuery);
        context.params.query = updatedQuery;
      } else {
        debug("Find query", query);
      }
    },
    create(context) {
      context.data.created_at = new Date();
    },
    update(context) {
      context.data.updated_at = new Date();
    },
    patch(context) {
      context.data.updated_at = new Date();
    }
  }
};

// app.service("todos").before({
//   find(hook) {
//     const query = hook.params.query;
//     if (query.name.$search) {
//       query.name = { $regex: new RegExp(query.name.$search) };
//     }
//   }
// });
