const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const PatientSchema = new Schema({
  firstName: {
    type: String,
    index: true
  },
  middleName: {
    type: String,
    index: true
  },
  lastName: {
    type: String,
    index: true
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
  address: {
    type: String
  },
  sex: {
    type: String
  },
  civilStatus: {
    type: String
  },
  nationality: {
    type: String
  },
  religion: {
    type: String
  },
  contactNumber: {
    type: String
  },
  guardianName: {
    type: String
  },
  relationship: {
    type: String
  },
  guardianContactNo: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  records: [
    {
      recordId: { type: String },
      dateAdded: {
        type: String
      },
      clinician: {
        type: String
      }
    }
  ],
  histories: [
    {
      MedHisId: { type: String },
      dateAdded: {
        type: String
      },
      clinician: {
        type: String
      }
    }
  ],
  activityLogs: [{ type: String }],
  photo: {
    type: String
  },
  icon: {
    type: String
  },
  notifications: [
    {
      clinicianId: { type: String },
      notificationLogs: {
        type: String
      },
      reason: {
        type: String
      },
      message: {
        type: String
      },
      duration: {
        type: Number
      },
      isRead: {
        type: Boolean,
        default: false
      }
    }
  ],
  practitioners: [
    {
      icon: {
        type: String
      },
      clinicianId: {
        type: String
      },
      clinicianName: { type: String },
      occupation: {
        type: String
      }
    }
  ],
  storage: {
    totalStorage: {
      type: Number,
      default: 10485760
    },
    usedStorage: {
      type: Number,
      default: 0
    }
  },
  verified: {
    type: Boolean,
    default: false
  }
});
PatientSchema.index({
  firstName: "text",
  middleName: "text",
  lastName: "text"
});

module.exports = Patient = mongoose.model("patients", PatientSchema);
