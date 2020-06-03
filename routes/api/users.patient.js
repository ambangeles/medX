const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const {
  today,
  getAge,
  getMonth,
  capitalize
} = require("../../middleware/date");
const {
  setupValidation,
  editInfoValidation,
  passwordValidation
} = require("../../middleware/validator");
const Patient = require("../../models/User.patient");
const Clinician = require("../../models/User.clinician");

//Change the plan of patient
router.post("/changePlan", auth, (req, res) => {
  Patient.findByIdAndUpdate(
    req.user.id,
    {
      "storage.totalStorage": req.body.plan
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
  if (req.body.plan == 524288000) {
    Patient.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          activityLogs: {
            $each: [`Plan changed to 500 MB plan at ${today()}`],
            $position: 0
          }
        }
      },
      { safe: true },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
      }
    );
  } else if (req.body.plan == 1073741824) {
    Patient.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          activityLogs: {
            $each: [`Plan changed to 1 GB plan at ${today()}`],
            $position: 0
          }
        }
      },
      { safe: true },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  return res.json({ msg: "CHANGE_PLAN_SUCCESS" });
});

//Update password of patient
router.post("/update/password", auth, (req, res) => {
  //Validation
  Patient.findById(req.user.id).then((patient) => {
    const { currentPassword, newPassword } = req.body;
    bcrypt.compare(currentPassword, patient.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          msg: `"Current Password" is incorrect`
        });
      const { error } = passwordValidation(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message
        });
      //Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          patient.password = newPassword;
          patient.password = hash;
          patient
            .save()
            .then(() => {
              return res.json({
                msg: "UPDATE_PASSWORD_SUCCESS"
              });
            })
            .catch((err) => {
              return res.status(400).json("Error" + err);
            });
        });
      });
    });
    Patient.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          activityLogs: {
            $each: [`Password Updated at ${today()}`],
            $position: 0
          }
        }
      },
      { safe: true },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});

//Update email address of patient
router.post("/update/email", auth, (req, res) => {
  const { email, inputCode, code } = req.body;
  if (!inputCode) {
    return res.status(400).json({ msg: "Please enter all fields." });
  } else if (code == inputCode) {
    Patient.findById(req.user.id).then((patient) => {
      patient.email = email;
      patient
        .save()
        .then(() => {
          return res.json({
            msg: "UPDATE_EMAIL_SUCCESS"
          });
        })
        .catch((err) => {
          return res.status(400).json({ msg: "Error" + err });
        });
    });
    Patient.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          activityLogs: {
            $each: [`Email Updated at ${today()}`],
            $position: 0
          }
        }
      },
      { safe: true },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
      }
    );
  } else {
    return res.status(400).json({ msg: "Code does not match." });
  }
});

//Edit patient information
router.post("/editInfo", auth, (req, res) => {
  //Validation
  const { error } = editInfoValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  Patient.findById(req.user.id).then((patient) => {
    patient.address = req.body.address;
    patient.civilStatus = req.body.civilStatus;
    patient.nationality = capitalize(req.body.nationality);
    patient.religion = capitalize(req.body.religion);
    patient.contactNumber = req.body.contactNumber;
    patient.guardianName = capitalize(req.body.guardianName);
    patient.relationship = capitalize(req.body.relationship);
    patient.guardianContactNo = req.body.guardianContactNo;

    patient
      .save()
      .then(() => {
        Patient.findByIdAndUpdate(
          req.user.id,
          {
            $push: {
              activityLogs: {
                $each: [`Information Updated at ${today()}`],
                $position: 0
              }
            }
          },
          { safe: true },
          function (err, doc) {
            if (err) {
              console.log(err);
            }
          }
        );
        return res.json({
          msg: "EDIT_INFO_SUCCESS"
        });
      })
      .catch((err) => {
        return res.status(400).json({ msg: "Error" + err });
      });
  });
});

//Setup information of newly registered patient
router.post("/setup", auth, (req, res) => {
  //Validation
  const { error } = setupValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  } else if (
    req.body.contactNumber.length !== 11 ||
    req.body.guardianContactNo.length !== 11
  ) {
    return res.status(400).json({ msg: "Contact Number must be 11 digits" });
  }

  Patient.findById(req.user.id).then((patient) => {
    patient.address = req.body.address;
    patient.religion = capitalize(req.body.religion);
    patient.civilStatus = capitalize(req.body.civilStatus);
    patient.nationality = capitalize(req.body.nationality);
    patient.contactNumber = req.body.contactNumber;
    patient.guardianName = capitalize(req.body.guardianName);
    patient.relationship = capitalize(req.body.relationship);
    patient.guardianContactNo = req.body.guardianContactNo;
    patient.save().then(() => {
      return res.json({ msg: "SETUP_SUCCESS" });
    });
  });
});

//END OF NEW API

//Get all activity logs
router.get("/userLogs", auth, (req, res) => {
  Patient.findById(req.user.id)
    .select("activityLogs")
    .select("-_id")
    .then((patient) => res.json(patient));
});

//Get all notifications
router.get("/getNotifications", auth, (req, res) => {
  Patient.findById(req.user.id)
    .select("notifications.notificationLogs")
    .then((patient) => res.json(patient));
});

//Deny access of clinician
router.post("/deniedAccess/:id", auth, (req, res) => {
  Clinician.findById(req.params.id).then((clinician) => {
    Patient.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          activityLogs: {
            $each: [
              `Denied ${clinician.firstName} ${
                clinician.lastName
              } access at ${today()}`
            ],
            $position: 0
          }
        }
      },
      { safe: true },
      function (err, doc) {
        if (err) {
          console.log(err);
        }
      }
    );
    Patient.findById(req.user.id).then((patient) => {
      Clinician.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            notificationLogs: {
              $each: [
                `Your request to access ${patient.firstName} ${
                  patient.lastName
                }'s medical records has been denied at ${today()}`
              ],
              $position: 0
            }
          }
        },
        { safe: true, upsert: false },
        function (err, doc) {
          if (err) {
            console.log(err);
          }
        }
      );
    });
    Patient.findById(req.user.id).then((patient) => {
      Clinician.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            activityLogs: {
              $each: [
                `Your request to access ${patient.firstName} ${
                  patient.lastName
                }'s medical records has been denied at ${today()}`
              ],
              $position: 0
            }
          }
        },
        { safe: true, upsert: false },
        function (err, doc) {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  });

  res.json("Access denied");
});

module.exports = router;
