require("dotenv-safe").config({ silent: true });
const mongoose = require("mongoose");
mongoose.set("bufferCommands", false);
mongoose.Promise = global.Promise;

async function setup() {
  const dbEnv = process.env.DB_ENV || "DEV";
  const key = `MONGO_URI_${dbEnv.toUpperCase()}`;
  const uri = process.env[key];
  console.log("DB connection", key);
  try {
    return await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = setup;
