const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const config = require("config");
const { today } = require("../../middleware/date");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const { emailValidation } = require("../../middleware/validator");
const abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      },
      {
        internalType: "string",
        name: "_medicalHistoryId",
        type: "string"
      }
    ],
    name: "getMedicalHistory",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      }
    ],
    name: "totalRecord",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      },
      {
        internalType: "string",
        name: "_recordId",
        type: "string"
      }
    ],
    name: "getRecord",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      },
      {
        internalType: "string",
        name: "_recordId",
        type: "string"
      },
      {
        internalType: "string",
        name: "_record",
        type: "string"
      }
    ],
    name: "insertRecord",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      },
      {
        internalType: "string",
        name: "_medicalHistoryId",
        type: "string"
      },
      {
        internalType: "string",
        name: "_medicalHistory",
        type: "string"
      }
    ],
    name: "insertMedicalHistory",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "_dataIndex",
        type: "uint256"
      }
    ],
    name: "getMedicalHistoryId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      }
    ],
    name: "totalMedHis",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "_dataIndex",
        type: "uint256"
      }
    ],
    name: "getRecordId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const contractInstance = new web3.eth.Contract(
  abi,
  "0x49c9b14Fba0BA1F4d9c19D60872300FA69b4a8D6"
);

// User Model
const Patient = require("../../models/User.patient");
const Permission = require("../../models/permissions");

// Get all records
router.get("/allRecords", auth, async (req, res) => {
  Patient.findById(req.user.id)
    .select("records")
    .then((patient) => {
      // console.log(patient);
      contractInstance.methods.totalRecord(req.user.id).call((err, totalId) => {
        let records = [];
        let ctr = 0;
        for (let i = 0; i < totalId; i++) {
          contractInstance.methods
            .getRecord(req.user.id, patient.records[i].recordId)
            .call((err, value) => {
              var bytes = cryptoJS.AES.decrypt(value.toString(), req.user.id);
              var record = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
              records.push(record);
              ctr++;
              if (ctr === parseInt(totalId)) {
                return res.json({
                  records
                });
              }
            });
        }
      });
    });
});

// Get record
router.get("/getRecord/:record", auth, async (req, res) => {
  Patient.findById(req.user.id).then((patient) => {
    contractInstance.methods
      .getRecord(patient.id, req.params.record)
      .call((err, record) => {
        var bytes = cryptoJS.AES.decrypt(record.toString(), patient.id);
        var record = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
        Patient.findByIdAndUpdate(
          req.user.id,
          {
            $push: {
              activityLogs: {
                $each: [
                  `Viewed your record: ${req.params.record} at ${today()}`
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
        return res.json({ record });
      });
  });
});

//Share medical record access to clinician
router.post("/share", auth, (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  } else if (!req.body.expiration) {
    return res.status(400).json({ msg: `"Duration" is required` });
  }

  const expire = new Date();
  const { email, expiration, canPrint, canInsert } = req.body;

  let duration = parseInt(expiration);

  Clinician.findOne({ email }).then((clinician) => {
    if (clinician) {
      Patient.findOne(
        { _id: req.user.id },
        {
          notifications: {
            $elemMatch: { isRead: false, clinicianId: clinician._id }
          }
        }
      ).then((exsisting) => {
        if (exsisting.notifications[0]) {
          return res.status(400).json({
            msg:
              "You have an existing request with this clinician. Check your notifications"
          });
        }
        Permission.findOne({
          clinicianId: clinician.id,
          patientId: req.user.id
        }).then((patient) => {
          if (!patient) {
            jwt.sign(
              { id: clinician.id },
              config.get("jwtSecretAccess"),
              { expiresIn: duration },
              (err, token) => {
                if (err) throw err;
                expire.setSeconds(expire.getSeconds() + duration);
                const newPermission = new Permission({
                  expireAt: expire,
                  clinicianId: clinician.id,
                  patientId: req.user.id,
                  shareToken: token,
                  canInsert: canInsert,
                  canPrint: canPrint,
                  name: clinician.firstName + " " + clinician.lastName,
                  occupation: clinician.occupation,
                  sex: clinician.sex
                });
                newPermission.save();
                Patient.findById(req.user.id).then((patient) => {
                  Clinician.find(
                    { _id: clinician.id },
                    {
                      patients: {
                        $elemMatch: {
                          patientId: patient._id
                        }
                      }
                    }
                  ).then((myPatient) => {
                    if (myPatient[0].patients.length === 0) {
                      Clinician.findByIdAndUpdate(
                        clinician.id,
                        {
                          $push: {
                            patients: [
                              {
                                icon: patient.icon,
                                patientId: patient._id,
                                patientName:
                                  patient.firstName + " " + patient.lastName,
                                birthdate:
                                  patient.birthMonth +
                                  "-" +
                                  patient.birthDay +
                                  "-" +
                                  patient.birthYear
                              }
                            ]
                          }
                        },
                        { safe: true, upsert: false },
                        function (err, doc) {
                          if (err) {
                            console.log(err);
                          }
                        }
                      );
                    }
                  });
                });
                Clinician.findOne({ email }).then((clinician) => {
                  Patient.find(
                    { _id: req.user.id },
                    {
                      practitioners: {
                        $elemMatch: {
                          clinicianId: clinician._id
                        }
                      }
                    }
                  ).then((myPractitioner) => {
                    if (myPractitioner[0].practitioners.length === 0) {
                      Patient.findByIdAndUpdate(
                        req.user.id,
                        {
                          $push: {
                            practitioners: [
                              {
                                icon: clinician.icon,
                                clinicianId: clinician._id,
                                clinicianName:
                                  clinician.firstName +
                                  " " +
                                  clinician.lastName,
                                occupation: clinician.occupation
                              }
                            ]
                          }
                        },
                        { safe: true },
                        function (err, doc) {
                          if (err) {
                            res.json(err);
                          }
                        }
                      );
                    }
                  });
                  Patient.findByIdAndUpdate(
                    req.user.id,
                    {
                      $push: {
                        activityLogs: {
                          $each: [
                            `Shared medical records to ${clinician.firstName} ${
                              clinician.lastName
                            } at ${today()}`
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
                    Clinician.findById(clinician.id).then((clinician) => {
                      const newNotification = {
                        notificationLogs: `${patient.firstName} ${
                          patient.lastName
                        }’s medical records has been shared to you at ${today()}`
                      };
                      clinician.notifications.unshift(newNotification);
                      clinician.save();
                    });
                  });
                  Patient.findById(req.user.id).then((patient) => {
                    Clinician.findByIdAndUpdate(
                      clinician.id,
                      {
                        $push: {
                          activityLogs: {
                            $each: [
                              `${patient.firstName} ${
                                patient.lastName
                              }’s medical records has been shared to you at ${today()}`
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
              }
            );
            return res.json({ msg: "SHARE_SUCCESS" });
          } else {
            return res
              .status(400)
              .json({ msg: "You have already shared your medical record" });
          }
        });
      });
    } else {
      return res.status(400).json({ msg: "No clinician found" });
    }
  });
});

// Get latest medical history
router.get("/specificHistory/:medHis", auth, async (req, res) => {
  Patient.findById(req.user.id).then((patient) => {
    contractInstance.methods
      .getMedicalHistory(patient.id, req.params.medHis)
      .call((err, medHis) => {
        var bytes = cryptoJS.AES.decrypt(medHis.toString(), patient.id);
        var medHis = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
        return res.json({ medHis });
      });
  });
});

//Get all permissions of patient
router.get("/permissions", auth, (req, res) => {
  Permission.find({
    patientId: req.user.id
  }).then((permissions) => {
    return res.json({ permissions });
  });
});

//Update Permissions
router.post("/update/permissions/:id", auth, (req, res) => {
  const { canInsert, canPrint, canView } = req.body;
  Permission.findById(req.params.id).then((permission) => {
    permission.occupation;
    permission.sex;
    permission.expireAt;
    permission.clinicianId;
    permission.name;
    permission.shareToken;
    permission.patientId;
    permission.canInsert = canInsert;
    permission.canPrint = canPrint;
    permission.canView = canView;
    permission
      .save()
      .then(() => {
        Clinician.findById(permission.clinicianId).then((clinician) => {
          Patient.findByIdAndUpdate(
            req.user.id,
            {
              $push: {
                activityLogs: {
                  $each: [
                    `Change the permission of ${clinician.firstName} ${
                      clinician.lastName
                    } to canView: ${canView}, canPrint: ${canPrint}, canInsert: ${canInsert} at ${today()}`
                  ],
                  $position: 0
                }
              }
            },
            { safe: true, upsert: false },
            function (err, doc) {
              if (err) console.log(err);
            }
          );
        });
        Patient.findById(req.user.id).then((patient) => {
          Clinician.findByIdAndUpdate(
            permission.clinicianId,
            {
              $push: {
                activityLogs: {
                  $each: [
                    `${patient.firstName} ${
                      patient.lastName
                    } changed your permission to canView: ${canView}, canPrint: ${canPrint}, canInsert: ${canInsert} ${today()}`
                  ],
                  $position: 0
                }
              }
            },
            { safe: true },
            function (err, doc) {
              if (err) console.log(err);
            }
          );
        });
        return res.json({ msg: "UPDATE_PERMISSIONS_SUCCESS" });
      })
      .catch((err) => res.status(400).json("Error" + err));
  });
});

//Cancel Request Access
router.post("/cancelRequest/:clinician/:id", auth, (req, res) => {
  Clinician.updateOne(
    {
      _id: req.params.clinician
    },
    {
      $pull: { isRequested: { patientId: req.user.id } }
    }
  ).then(
    Patient.findById(req.user.id).then((patient) => {
      Clinician.findByIdAndUpdate(
        req.params.clinician,
        {
          $push: {
            activityLogs: {
              $each: [
                `Requested access to ${patient.firstName} ${
                  patient.lastName
                }'s medicals records cancelled at ${today()}`
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
    }),
    Clinician.findById(req.params.clinician).then((clinician) => {
      Patient.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            activityLogs: {
              $each: [
                `Cancelled the request of ${clinician.firstName} ${
                  clinician.lastName
                } to your medical records at ${today()}`
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
    }),
    Patient.updateOne(
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
    )
  );
  return res.json({ msg: "CANCEL_REQUEST_SUCCESS" });
});

//Accept ClinicianToAccessPatient
router.post("/accept/:clinicianId/:duration/:id", auth, (req, res) => {
  const expiration = new Date();
  duration = parseInt(req.params.duration);
  Permission.findOne({
    clinicianId: req.params.clinicianId,
    patientId: req.user.id
  }).then((patient) => {
    if (!patient) {
      jwt.sign(
        { id: req.params.clinicianId },
        config.get("jwtSecretAccess"),
        { expiresIn: duration },
        (err, token) => {
          Clinician.updateOne(
            {
              _id: req.params.clinicianId
            },
            {
              $pull: { isRequested: { patientId: req.user.id } }
            },
            { safe: true, upsert: false },
            function (err, doc) {
              if (err) {
                console.log(err);
              }
            }
          );
          if (err) throw err;
          expiration.setSeconds(expiration.getSeconds() + duration);
          Clinician.findById(req.params.clinicianId).then((clinician) => {
            const newPermission = new Permission({
              expireAt: expiration,
              clinicianId: req.params.clinicianId,
              patientId: req.user.id,
              shareToken: token,
              name: clinician.firstName + " " + clinician.lastName,
              occupation: clinician.occupation,
              sex: clinician.sex
            });
            newPermission.save();
          });

          Clinician.findById(req.params.clinicianId).then((clinician) => {
            Patient.findByIdAndUpdate(
              req.user.id,
              {
                $push: {
                  activityLogs: {
                    $each: [
                      `Granted ${clinician.firstName} ${
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
          });
          Patient.findById(req.user.id).then((patient) => {
            Clinician.findByIdAndUpdate(
              req.params.clinicianId,
              {
                $push: {
                  activityLogs: {
                    $each: [
                      `Your request to access ${patient.firstName} ${
                        patient.lastName
                      }’s medical records has been accepted at ${today()}`
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
            Clinician.findById(req.params.clinicianId).then((clinician) => {
              const newNotification = {
                notificationLogs: `Your request to access ${
                  patient.firstName
                } ${
                  patient.lastName
                }’s medical records has been accepted at ${today()}`
              };
              clinician.notifications.unshift(newNotification);
              clinician.save();
            });
          });
          Patient.findById(req.user.id).then((patient) => {
            Clinician.findByIdAndUpdate(
              req.params.clinicianId,
              {
                $push: {
                  patients: [
                    {
                      icon: patient.icon,
                      patientName: patient.firstName + " " + patient.lastName,
                      birthdate:
                        patient.birthMonth +
                        "-" +
                        patient.birthDay +
                        "-" +
                        patient.birthYear
                    }
                  ]
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
          Clinician.findById(req.params.clinicianId).then((clinician) => {
            Patient.findByIdAndUpdate(
              req.user.id,
              {
                $push: {
                  practitioners: [
                    {
                      icon: clinician.icon,
                      clinicianName:
                        clinician.firstName + " " + clinician.lastName,
                      occupation: clinician.occupation
                    }
                  ]
                }
              },
              { safe: true },
              function (err, doc) {
                if (err) {
                  res.json(err);
                }
              }
            );
          });
        }
      );
      Patient.updateOne(
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
      return res.json({ msg: "ACCEPT_REQUEST_SUCCESS" });
    } else {
      return res.status(400).json("You have already accepted the request");
    }
  });
});

module.exports = router;
