const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PermissionsSchema = new Schema({
  expireAt: {
    type: Date
  },
  clinicianId: {
    type: String
  },
  patientId: {
    type: String
  },
  shareToken: {
    type: String
  },
  canPrint: {
    type: Boolean,
    default: true
  },
  canInsert: {
    type: Boolean,
    default: true
  },
  canView: {
    type: Boolean,
    default: true
  },
  occupation: {
    type: String
  },
  sex: {
    type: String
  },
  name: {
    type: String
  }
});

PermissionsSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = Permission = mongoose.model("permissions", PermissionsSchema);
