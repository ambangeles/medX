const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ClinicianSchema = new Schema({
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthMonth: {
    type: String
  },
  birthDay: {
    type: Number
  },
  birthYear: {
    type: Number
  },
  age: {
    type: Number
  },
  sex: {
    type: String
  },
  contactNumber: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  activityLogs: [{ type: String }],
  notifications: [
    {
      notificationLogs: { type: String },
      isRead: {
        type: Boolean,
        default: false
      }
    }
  ],

  occupation: {
    type: String
  },
  photo: {
    type: String
  },
  icon: {
    type: String
  },
  patients: [
    {
      icon: {
        type: String
      },
      patientId: {
        type: String
      },
      patientName: { type: String },
      birthdate: {
        type: String
      }
    }
  ],
  isRequested: [
    { patientId: { type: String }, notificationId: { type: String } }
  ],
  verified: {
    type: Boolean,
    default: false
  }
});
module.exports = Clinician = mongoose.model("clinicians", ClinicianSchema);
