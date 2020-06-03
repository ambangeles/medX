const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const shortid = require("shortid");
const { today, byteLength } = require("../../middleware/date");
const auth = require("../../middleware/auth");
const access = require("../../middleware/auth.access");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
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
  "0x311F0b756e558c289D3CC9bd7Fcf9962C2C03A17"
);

// User Model
const Clinician = require("../../models/User.clinician");
const Patient = require("../../models/User.patient");
const Permission = require("../../models/permissions");

// Get All Records
router.get("/allRecords/:patient", auth, access, async (req, res) => {
  Patient.findById(req.params.patient)
    .select("records")
    .then((patient) => {
      contractInstance.methods
        .totalRecord(req.params.patient)
        .call((err, totalId) => {
          let records = [];
          let ctr = 0;
          for (let i = 0; i < totalId; i++) {
            contractInstance.methods
              .getRecord(req.params.patient, patient.records[i].recordId)
              .call((err, value) => {
                var bytes = cryptoJS.AES.decrypt(
                  value.toString(),
                  req.params.patient
                );
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

//Insert record
router.post("/addRecord/:id", auth, access, (req, res) => {
  const recordId = shortid.generate();

  const {
    bloodPressure,
    pulseRate,
    respiratoryRate,
    temperature,
    heent,
    heart,
    lungs,
    abdomen,
    extremities,
    completeBloodCount,
    urinalysis,
    fecalysis,
    chestXray,
    isihiraTest,
    audio,
    psychologicalExam,
    drugTest,
    hepatitisBTest,
    complaints,
    diagnosis,
    treatment,
    remarks
  } = req.body;
  const record = {
    bloodPressure,
    pulseRate,
    respiratoryRate,
    temperature,
    heent,
    heart,
    lungs,
    abdomen,
    extremities,
    completeBloodCount,
    urinalysis,
    fecalysis,
    chestXray,
    isihiraTest,
    audio,
    psychologicalExam,
    drugTest,
    hepatitisBTest,
    complaints,
    diagnosis,
    treatment,
    remarks
  };

  // Encrypt record
  let ciphertext = cryptoJS.AES.encrypt(JSON.stringify(record), req.params.id);

  contractInstance.methods
    .insertRecord(req.params.id, recordId, ciphertext.toString())
    .send(
      {
        from: "0x81975268F39D17EEF0a66B4EC45ccEE451346639",
        gas: 6721975
      },
      function (err, result) {
        Patient.findById(req.params.id).then((patient) => {
          Clinician.findByIdAndUpdate(
            req.user.id,
            {
              $push: {
                activityLogs: {
                  $each: [
                    `Inserted a record: ${recordId} for ${patient.firstName} ${
                      patient.lastName
                    } at ${today()}`
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
        Clinician.findById(req.user.id).then((clinician) => {
          Patient.findByIdAndUpdate(
            req.params.id,
            {
              $push: {
                activityLogs: {
                  $each: [
                    `${clinician.firstName} ${
                      clinician.lastName
                    } inserted record: ${recordId} at ${today()}`
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
        let size = byteLength(ciphertext.toString());
        Patient.findById(req.params.id).then((patient) => {
          Patient.findByIdAndUpdate(
            req.params.id,
            {
              "storage.usedStorage": patient.storage.usedStorage + size
            },
            function (err, result) {
              if (err) {
                console.log(err);
              }
            }
          );
        });
        Patient.findOne({ _id: req.params.id }).then((patient) => {
          Clinician.findById(req.user.id).then((clinician) => {
            const newRecord = {
              recordId: recordId,
              dateAdded: today(),
              clinician: `${clinician.firstName} ${clinician.lastName}`
            };
            patient.records.unshift(newRecord);
            patient.save().then(res.json({ msg: "RECORD_INSERTED_SUCCESS" }));
          });
        });
      }
    );
});

//Update Medical History
router.post("/addHistory/:id", auth, access, (req, res) => {
  const activityLogs = (ciphertext) => {
    let size = byteLength(ciphertext.toString());
    Patient.findById(req.params.id).then((patient) => {
      Patient.findByIdAndUpdate(
        req.params.id,
        {
          "storage.usedStorage": patient.storage.usedStorage + size
        },
        function (err, result) {
          if (err) console.log(err);
        }
      );
    });
    Patient.findById(req.params.id).then((patient) => {
      Clinician.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            activityLogs: {
              $each: [
                `Inserted a medical history: ${medHisId} for ${
                  patient.firstName
                } ${patient.lastName} at ${today()}`
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
    Clinician.findById(req.user.id).then((clinician) => {
      Patient.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            activityLogs: {
              $each: [
                ` ${clinician.firstName} ${
                  clinician.lastName
                } inserted medical history: ${medHisId} at ${today()}`
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
    Patient.findOne({ _id: req.params.id }).then((patient) => {
      Clinician.findById(req.user.id).then((clinician) => {
        const newHistory = {
          MedHisId: medHisId,
          dateAdded: today(),
          clinician: `${clinician.firstName} ${clinician.lastName}`
        };

        patient.histories.unshift(newHistory);
        patient
          .save()
          .then(res.json({ msg: "MEDHIS_INSERTED_SUCCESS", medHisId }));
      });
    });
  };
  let medHisId = shortid.generate();
  Patient.findById(req.params.id).then((patient) => {
    if (patient.sex == "Male") {
      const {
        pastIllness,
        famIllness,
        immunization,
        hospitalizations,
        operations,
        allergies,
        medication,
        bloodType,
        height,
        weight,
        bodyArt,
        habits,
        visualAcuity
      } = req.body;

      const medHis = {
        pastIllness,
        famIllness,
        immunization,
        hospitalizations,
        operations,
        allergies,
        medication,
        bloodType,
        height,
        weight,
        bodyArt,
        habits,
        visualAcuity
      };

      // Encrypt medical history
      let ciphertext = cryptoJS.AES.encrypt(
        JSON.stringify(medHis),
        req.params.id
      );

      contractInstance.methods
        .insertMedicalHistory(req.params.id, medHisId, ciphertext.toString())
        .send({
          from: "0x81975268F39D17EEF0a66B4EC45ccEE451346639",
          gas: 6721975
        });
      activityLogs(ciphertext);
    } else if (patient.sex == "Female") {
      const {
        pastIllness,
        famIllness,
        immunization,
        hospitalizations,
        operations,
        allergies,
        medication,
        bloodType,
        height,
        weight,
        bodyArt,
        habits,
        visualAcuity,
        menarchYear,
        menarchAge,
        mensDuration,
        dysmennorrhea
      } = req.body;

      const medHis = {
        pastIllness,
        famIllness,
        immunization,
        hospitalizations,
        operations,
        allergies,
        medication,
        bloodType,
        height,
        weight,
        bodyArt,
        habits,
        visualAcuity,
        menarchYear,
        menarchAge,
        mensDuration,
        dysmennorrhea
      };
      // Encrypt
      let ciphertext = cryptoJS.AES.encrypt(
        JSON.stringify(medHis),
        req.params.id
      );

      contractInstance.methods
        .insertMedicalHistory(req.params.id, medHisId, ciphertext.toString())
        .send({
          from: "0x81975268F39D17EEF0a66B4EC45ccEE451346639",
          gas: 6721975
        });
      activityLogs(ciphertext);
    }
  });
});

// Get the first medical history of patient
router.get("/firstHistory/:patient/:medHis", auth, access, async (req, res) => {
  contractInstance.methods
    .getMedicalHistory(req.params.patient, req.params.medHis)
    .call((err, medHis) => {
      var bytes = cryptoJS.AES.decrypt(medHis.toString(), req.params.patient);
      var medHis = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
      return res.json({ history: medHis });
    });
});

// Get specific medical history
router.get(
  "/specificHistory/:patient/:medHis",
  auth,
  access,
  async (req, res) => {
    contractInstance.methods
      .getMedicalHistory(req.params.patient, req.params.medHis)
      .call((err, medHis) => {
        var bytes = cryptoJS.AES.decrypt(medHis.toString(), req.params.patient);
        var medHis = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
        Patient.findById(req.params.patient).then((patient) => {
          Clinician.findByIdAndUpdate(
            req.user.id,
            {
              $push: {
                activityLogs: {
                  $each: [
                    `Viewed a medical history: ${req.params.medHis} of ${
                      patient.firstName
                    } ${patient.lastName} at ${today()}`
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
        Clinician.findById(req.user.id).then((clinician) => {
          Patient.findByIdAndUpdate(
            req.params.patient,
            {
              $push: {
                activityLogs: {
                  $each: [
                    ` ${clinician.firstName} ${
                      clinician.lastName
                    } viewed your medical hitory: ${
                      req.params.medHis
                    } at ${today()}`
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
        return res.json({ medHis });
      });
  }
);

// Get specific record
router.get(
  "/specificRecord/:patient/:record",
  auth,
  access,
  async (req, res) => {
    contractInstance.methods
      .getRecord(req.params.patient, req.params.record)
      .call((err, record) => {
        var bytes = cryptoJS.AES.decrypt(record.toString(), req.params.patient);
        var record = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
        Patient.findById(req.params.patient).then((patient) => {
          Clinician.findByIdAndUpdate(
            req.user.id,
            {
              $push: {
                activityLogs: {
                  $each: [
                    `Viewed a record: ${req.params.record} of ${
                      patient.firstName
                    } ${patient.lastName} at ${today()}`
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
        Clinician.findById(req.user.id).then((clinician) => {
          Patient.findByIdAndUpdate(
            req.params.patient,
            {
              $push: {
                activityLogs: {
                  $each: [
                    ` ${clinician.firstName} ${
                      clinician.lastName
                    } viewed your record ${req.params.record} at ${today()}`
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
        return res.json({ record });
      });
  }
);

//Cancel request access to patient
router.post("/cancelRequest/:patient", auth, (req, res) => {
  Clinician.findOne({
    _id: req.user.id,
    "isRequested.patientId": req.params.patient
  }).then((request) =>
    Patient.update(
      {
        _id: req.params.patient
      },
      {
        $pull: {
          notifications: { _id: request.isRequested[0].notificationId }
        }
      }
    )
  );
  Clinician.updateOne(
    {
      _id: req.user.id
    },
    {
      $pull: { isRequested: { patientId: req.params.patient } }
    }
  ).then(
    Patient.findById(req.params.patient).then((patient) => {
      Clinician.findByIdAndUpdate(
        req.user.id,
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
    Clinician.findById(req.user.id).then((clinician) => {
      Patient.findByIdAndUpdate(
        req.params.patient,
        {
          $push: {
            activityLogs: {
              $each: [
                ` ${clinician.firstName} ${
                  clinician.lastName
                } cancelled the request to your medical records at ${today()}`
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
    res.json({ msg: "CANCEL_REQUEST_SUCCESS" })
  );
});

//Request access to patient
router.post("/request/:patient", auth, (req, res) => {
  if (!req.body.reason) {
    return res.status(400).json({ msg: "Reason is required" });
  }
  if (!req.body.duration) {
    return res.status(400).json({ msg: "Duration is required" });
  }
  Clinician.findById(req.user.id).then((clinician) => {
    Patient.findById(req.params.patient).then((patient) => {
      patient.notifications.unshift({
        clinicianId: clinician._id,
        notificationLogs: ` ${clinician.firstName} ${
          clinician.lastName
        } wants to access your medical records at ${today()}`,
        reason: req.body.reason,
        message: req.body.message,
        duration: req.body.duration
      });
      patient.save().then(
        Clinician.findByIdAndUpdate(
          req.user.id,
          {
            $push: {
              isRequested: {
                $each: [
                  {
                    patientId: req.params.patient,
                    notificationId: patient.notifications[0].id
                  }
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
        ),
        Patient.findById(req.params.patient).then((patient) => {
          Clinician.findByIdAndUpdate(
            req.user.id,
            {
              $push: {
                activityLogs: {
                  $each: [
                    `Requested access to ${patient.firstName} ${
                      patient.lastName
                    }'s medicals records at ${today()}`
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
        Clinician.findById(req.user.id).then((clinician) => {
          Patient.findByIdAndUpdate(
            req.params.patient,
            {
              $push: {
                activityLogs: {
                  $each: [
                    ` ${clinician.firstName} ${
                      clinician.lastName
                    } wanted to access you medical records at ${today()}`
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
        })
      );
    });
  });
  return res.json({ msg: "REQUEST_SUCCESS" });
});

//Search for accounts
router.get("/search/:name", auth, (req, res) => {
  Patient.find(
    {
      $text: {
        $search: req.params.name
      }
    },
    { score: { $meta: "textScore" } }
  )
    .select("_id")
    .select("firstName")
    .select("middleName")
    .select("lastName ")
    .select("isRequested")
    .sort({ score: { $meta: "textScore" } })
    .then((search) => {
      return res.json({
        msg: "SEARCH_SUCCESS",
        search
      });
    });
});

//Get all permissions for clinician
router.get("/permissions", auth, (req, res) => {
  Permission.find({
    clinicianId: req.user.id
  }).then((permissions) => {
    return res.json({
      permissions
    });
  });
});

//View the patient with permissions
router.get("/:id", auth, access, (req, res) => {
  Patient.findById(req.params.id)
    .select("_id")
    .select("firstName")
    .select("middleName")
    .select("lastName ")
    .select("civilStatus")
    .select("birthDay")
    .select("birthMonth ")
    .select("birthYear")
    .select("age")
    .select("nationality ")
    .select("religion")
    .select("sex")
    .select("address ")
    .select("contactNumber")
    .select("records")
    .select("histories")
    .select("guardianName")
    .select("relationship")
    .select("guardianContactNo")
    .select("storage")
    .select("icon")
    .then((patient) =>
      res.json({
        view: patient,
        msg: "VIEW_SUCCESS",
        medHisId:
          patient.histories.length === 0 ? null : patient.histories[0].MedHisId
      })
    );
});

// //TEST
// const contractInstance = new web3.eth.Contract(
//   abi,
//   "0x49c9b14Fba0BA1F4d9c19D60872300FA69b4a8D6"
// );

// //Update Medical History
// router.post("/addHistory/:id/:medHis", (req, res) => {
//   let medHisId = req.params.medHis;
//   const { x } = req.body;

//   const medHis = {
//     x
//   };

//   // Encrypt medical history
//   let ciphertext = cryptoJS.AES.encrypt(JSON.stringify(medHis), req.params.id);

//   contractInstance.methods
//     .insertMedicalHistory(req.params.id, medHisId, ciphertext.toString())
//     .send({
//       from: "0x247EB95A0Ecb5B4b8CB087a6B86d050B552d93cB",
//       gas: 20000000000
//     });
//   res.json({});
// });

// // Get latest medical history
// router.get("/getHistory/:id/:medHis", async (req, res) => {
//   Patient.findById(req.params.id).then((patient) => {
//     contractInstance.methods
//       .getMedicalHistory(patient.id, req.params.medHis)
//       .call((err, medHis) => {
//         var bytes = cryptoJS.AES.decrypt(medHis.toString(), patient.id);
//         var medHis = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
//         return res.json({ medHis });
//       });
//   });
// });
module.exports = router;
