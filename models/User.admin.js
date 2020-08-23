const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const AdminSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
