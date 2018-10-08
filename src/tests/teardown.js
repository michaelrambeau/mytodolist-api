const mongoose = require("mongoose");

const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

async function teardown() {
  console.log("Teardown...");
  await mongoose.disconnect();
  await mongoose.connection.close();
  await wait(1000);
  console.log("THE END");
}

module.exports = teardown;
