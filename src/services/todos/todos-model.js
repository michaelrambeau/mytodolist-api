const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: false
  },
  created_at: Date,
  updated_at: Date
});
const model = mongoose.model("ToDo", schema, "todos", true);

module.exports = model;
