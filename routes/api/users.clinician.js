const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const auth = require("../../middleware/auth");
const {
  today,
  getAge,
  getMonth,
  capitalize
} = require("../../middleware/date");
const {
  editInfoCValidation,
  passwordValidation
} = require("../../middleware/validator");
// User Model
const Clinician = require("../../models/User.clinician");
const Patient = require("../../models/User.patient");

//Update password of patient
router.post("/update/password", auth, (req, res) => {
  //Validation
  Clinician.findById(req.user.id).then((clinician) => {
    const { currentPassword, newPassword } = req.body;
    bcrypt.compare(currentPassword, clinician.password).then((isMatch) => {
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
          clinician.password = newPassword;
          clinician.password = hash;
          clinician
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
    Clinician.findByIdAndUpdate(
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

//Update email address of clinician
router.post("/update/email", auth, (req, res) => {
  const { email, inputCode, code } = req.body;
  if (!inputCode) {
    return res.status(400).json({ msg: "Please enter all fields." });
  } else if (code == inputCode) {
    Clinician.findById(req.user.id).then((clinician) => {
      clinician.email = email;
      clinician
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
    Clinician.findByIdAndUpdate(
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

//Update information of clinician
router.post("/editInfoC", auth, (req, res) => {
  //Validation
  const { error } = editInfoCValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  Clinician.findById(req.user.id).then((clinician) => {
    clinician.contactNumber = req.body.contactNumber;
    clinician
      .save()
      .then(() => {
        Clinician.findByIdAndUpdate(
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
        return res.status(400).json("Error" + err);
      });
  });
});

router.post("/selectOccupation", (req, res) => {
  const { occupation } = req.body;
  if (!occupation) {
    return res.status(400).json({ msg: "Please select one occupation" });
  } else {
    return res.json({ occupation, msg: "SELECT_OCCUPATION_SUCCESS" });
  }
});
//END

//Change boolean if the notification is read
router.get("/notification/:id", auth, (req, res) => {
  Clinician.updateOne(
    { "notifications._id": req.params.id },
    {
      $set: {
        "notifications.$.isRead": true
      }
    },
    function (err) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
    }
  );
});

module.exports = router;
