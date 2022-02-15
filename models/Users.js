const { Schema, model, ObjectId } = require("mongoose");

const Users = new Schema({
  name: { type: String },
  login: { type: String },
  password: { type: String },
  group: { type: Number },
  facultet: { type: String },
  adminLevel: { type: Number },
  notes: { type: Array },
});

module.exports = model("Users", Users);
