require("dotenv-safe").config({ silent: true });
const debug = require("debug")("*");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const createApp = require("./app");

const Model = require("./services/todos/todos-model");

async function main() {
  const dbEnv = process.env.DB_ENV || "DEV";
  const key = `MONGO_URI_${dbEnv.toUpperCase()}`;
  const uri = process.env[key];
  debug("Start the API", key);
  try {
    connect(uri);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    throw new Error("Unable to connect to the DB", `${uri.slice(0, 12)}...`);
  }
  const port = process.env.PORT || 3030;
  const app = createApp({ Model });
  debug("API started, listening on port", port);
  app.listen(port);
}

function connect(uri) {
  debug("Connecting", `${uri.slice(0, 12)}...`);
  mongoose.connect(
    uri,
    { useNewUrlParser: true }
  );
}

main();
