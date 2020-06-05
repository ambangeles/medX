const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const auth = require("../../middleware/auth");
const pass = require("../../middleware/forgotPass");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const {
  today,
  isFileImage,
  getAge,
  getMonth,
  capitalize
} = require("../../middleware/date");
const {
  emailValidation,
  registerValidation,
  resetValidation
} = require("../../middleware/validator");
// User Model
const Clinician = require("../../models/User.clinician");
const Patient = require("../../models/User.patient");

let gfs;
const conn = mongoose
  .set("useNewUrlParser", true)
  .set("useUnifiedTopology", true)
  .createConnection(config.get("mongoURI"));

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
const storage = new GridFsStorage({
  url: config.get("mongoURI"),
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

//Display single file object
router.get("/file/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    // File exists
    return res.json(file);
  });
});

//Display validation image
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

//Display icon
router.get("/getIcon/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

//Upload user icon
router.post(
  "/uploadIcon/:email/:icon",
  upload.single("file"),
  auth,
  (req, res) => {
    //Check if the file is image
    const error = isFileImage(req.file);
    if (!error) return res.status(400).json({ msg: "Upload image file only" });
    //Delete previous icon
    gfs.remove(
      {
        filename: req.params.icon,
        root: "uploads"
      },
      (err, gridStore) => {
        if (err) {
          return res.status(404).json({
            msg: err
          });
        }
      }
    );

    //Upload new icon
    Clinician.findOne({
      email: req.params.email
    }).then((clinician) => {
      if (clinician) {
        clinician.icon = req.file.filename;
        clinician.save();
        res.json({
          msg: "UPLOAD_ICON_SUCCESS"
        });
      } else {
        Patient.findOne({
          email: req.params.email
        }).then((patient) => {
          if (patient) {
            patient.icon = req.file.filename;
            patient.save();
            res.json({
              msg: "UPLOAD_ICON_SUCCESS"
            });
          }
        });
      }
    });
  }
);

//Get user data
router.get("/userInfo", auth, (req, res) => {
  Patient.findById(req.user.id)
    .select("-password")
    .then((patient) => {
      if (patient) {
        res.json({ patient });
      } else if (!patient) {
        Clinician.findById(req.user.id)
          .select("-password")
          .then((clinician) => res.json({ clinician }));
      }
    });
});

//Upload validation and register patient
router.post("/uploadRegister/:data", upload.single("file"), (req, res) => {
  //Check if the file is image
  const error = isFileImage(req.file);
  if (!error) return res.status(400).json({ msg: "Upload image file only" });
  const {
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password
  } = JSON.parse(req.params.data);
  const photo = req.file.filename;
  const activityLogs = `Registered at ${today()}`;
  const newPatient = new Patient({
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password,
    activityLogs,
    photo
  });

  // Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPatient.password, salt, (err, hash) => {
      if (err) throw err;
      newPatient.password = hash;
      newPatient.save().then((Patient) => {
        jwt.sign(
          {
            id: Patient.id
          },
          config.get("jwtSecret"),
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            return res.json({
              token,
              patient: Patient,
              msg: "UPLOAD_REGISTER_SUCCESS"
            });
          }
        );
      });
    });
  });
});

//Upload validation and register clinician
router.post("/uploadRegisterC/:data", upload.single("file"), (req, res) => {
  //Check if the file is image
  const error = isFileImage(req.file);
  if (!error) return res.status(400).json({ msg: "Upload image file only" });
  const {
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password,
    occupation
  } = JSON.parse(req.params.data);
  const photo = req.file.filename;

  const activityLogs = `Registered at ${today()}`;
  const newClinician = new Clinician({
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password,
    activityLogs,
    photo,
    occupation
  });

  // Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newClinician.password, salt, (err, hash) => {
      if (err) throw err;
      newClinician.password = hash;
      newClinician.save().then((Clinician) => {
        jwt.sign(
          {
            id: Clinician.id
          },
          config.get("jwtSecret"),
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            return res.json({
              token,
              patient: Clinician,
              msg: "UPLOAD_REGISTER_SUCCESS"
            });
          }
        );
      });
    });
  });
});

//Match the code
router.post("/match", (req, res) => {
  const { inputCode, code } = req.body;
  if (!inputCode) {
    return res.status(400).json({ msg: "Please enter all fields" });
  } else if (code == inputCode) {
    return res.json({
      msg: "MATCH_CODE_SUCCESS"
    });
  } else {
    return res.status(400).json({ msg: "Code does not match" });
  }
});

//Login user
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter all fields" });

  // Check for existing clinician
  Clinician.findOne({ email }).then((clinician) => {
    if (!clinician) {
      // Check for existing patient
      Patient.findOne({ email }).then((patient) => {
        if (!patient)
          return res.status(400).json({ msg: "User does not exist" });
        // Validate password for patient
        bcrypt.compare(password, patient.password).then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ msg: "Incorrect password" });
          jwt.sign(
            { id: patient.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              Patient.findByIdAndUpdate(
                patient.id,
                {
                  $push: {
                    activityLogs: {
                      $each: [`Logged in at ${today()}`],
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
                msg: "LOGIN_SUCCESS",
                token,
                patient,
                isAuthenticated: true
              });
            }
          );
        });
      });
    } else {
      // Validate password for clinician
      bcrypt.compare(password, clinician.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Incorrect password" });
        jwt.sign(
          { id: clinician.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            Clinician.findByIdAndUpdate(
              clinician.id,
              {
                $push: {
                  activityLogs: {
                    $each: [`Logged in at ${today()}`],
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
              msg: "LOGIN_SUCCESS",
              token,
              clinician,
              isAuthenticated: true
            });
          }
        );
      });
    }
  });
});

//Login user
router.post("/logout", auth, (req, res) => {
  Patient.findById(req.user.id)
    .select("-password")
    .then((patient) => {
      if (patient) {
        Patient.findByIdAndUpdate(
          patient.id,
          {
            $push: {
              activityLogs: {
                $each: [`Logged out at ${today()}`],
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
          msg: "LOGOUT_SUCCESS"
        });
      }
      Clinician.findById(req.user.id)
        .select("-password")
        .then((clinician) => {
          Clinician.findByIdAndUpdate(
            clinician.id,
            {
              $push: {
                activityLogs: {
                  $each: [`Logged out at ${today()}`],
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
            msg: "LOGOUT_SUCCESS"
          });
        });
    });
});

//Send code to the given email address
router.post("/sendEmail", (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  // Check for existing user
  Patient.findOne({ email: req.body.email }).then((patient) => {
    if (patient)
      return res.status(400).json({ msg: `"Email address" already used` });
    Clinician.findOne({ email: req.body.email }).then((clinician) => {
      if (clinician)
        return res.status(400).json({ msg: `"Email address" already used` });
      //Generate and send code to the given email address
      const code = Math.floor(100000 + Math.random() * 900000);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "medXinformation@gmail.com",
          pass: "Abcd1234!"
        }
      });

      const mailOptions = {
        from: "medXinformation@gmail.com",
        to: req.body.email,
        subject: "Email Verification",
        text: `Here is you code: ${code}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
        return res.json({ code, msg: "EMAIL_SENT_SUCCESS" });
      });
    });
  });
});

//First step in registration
router.post("/firstStep", (req, res) => {
  //Validation
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      msg: error.details[0].message
    });

  const { birthMonth, birthDay, birthYear, sex, email, password } = req.body;
  const age = getAge(getMonth(birthMonth) + "/" + birthDay + "/" + birthYear);
  if (age <= 17) {
    return res.status(400).json({
      msg: "I'm sorry. Only users 18 years old and above can sign up"
    });
  }

  const newUser = {
    firstName: capitalize(req.body.firstName),
    middleName: capitalize(req.body.middleName),
    lastName: capitalize(req.body.lastName),
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password
  };

  //Check for existing user
  const { firstName, middleName, lastName } = newUser;
  Patient.find({
    firstName,
    middleName,
    lastName,
    birthDay,
    birthMonth,
    birthYear,
    age
  }).then((user) => {
    if (user.length !== 0) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }
    Patient.findOne({ email }).then((patient) => {
      if (patient)
        return res.status(400).json({
          msg: "Email already exists"
        });
      Clinician.findOne({ email }).then((clinician) => {
        if (clinician)
          return res.status(400).json({
            msg: "Email already exists"
          });
        //Generate code and send to email
        const code = Math.floor(100000 + Math.random() * 900000);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "medXinformation@gmail.com",
            pass: "Abcd1234!"
          }
        });
        const mailOptions = {
          from: "medXinformation@gmail.com",
          to: email,
          subject: "Email Verification",
          text: `Here is you code: ${code}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) console.log(error);
          return res.json({
            code,
            user: newUser,
            msg: "FIRST_STEP_SUCCESS"
          });
        });
      });
    });
  });
});

//First step in registration
router.post("/firstStepC", (req, res) => {
  //Validation
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      msg: error.details[0].message
    });

  const { birthMonth, birthDay, birthYear, sex, email, password } = req.body;
  const age = getAge(getMonth(birthMonth) + "/" + birthDay + "/" + birthYear);
  if (age <= 17) {
    return res.status(400).json({
      msg: "I'm sorry. Only users 18 years old and above can sign up"
    });
  }

  const newUser = {
    firstName: capitalize(req.body.firstName),
    middleName: capitalize(req.body.middleName),
    lastName: capitalize(req.body.lastName),
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password
  };

  //Check for existing user
  const { firstName, middleName, lastName } = newUser;
  Clinician.find({
    firstName,
    middleName,
    lastName,
    birthDay,
    birthMonth,
    birthYear,
    age
  }).then((user) => {
    if (user.length !== 0) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }
    Patient.findOne({ email }).then((patient) => {
      if (patient)
        return res.status(400).json({
          msg: "Email already exists"
        });
      Clinician.findOne({ email }).then((clinician) => {
        if (clinician)
          return res.status(400).json({
            msg: "Email already exists"
          });
        //Generate code and send to email
        const code = Math.floor(100000 + Math.random() * 900000);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "medXinformation@gmail.com",
            pass: "Abcd1234!"
          }
        });
        const mailOptions = {
          from: "medXinformation@gmail.com",
          to: email,
          subject: "Email Verification",
          text: `Here is you code: ${code}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) console.log(error);
          return res.json({
            code,
            user: newUser,
            msg: "FIRST_STEP_SUCCESS"
          });
        });
      });
    });
  });
});

//Send code
router.post("/sendLink", (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  // Check for existing email
  Patient.findOne({ email: req.body.email }).then((patient) => {
    if (!patient) {
      Clinician.findOne({ email: req.body.email }).then((clinician) => {
        if (!clinician) {
          return res.status(400).json({ msg: "Email does not exist" });
        } else {
          jwt.sign(
            { id: clinician.id },
            config.get("jwtSecretPass"),
            { expiresIn: 600 },
            (err, token) => {
              if (err) throw err;
              let transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                auth: {
                  user: "medXinformation@gmail.com",
                  pass: "Abcd1234!"
                }
              });

              let mailOptions = {
                from: "medXinformation@gmail.com",
                to: req.body.email,
                subject: "Email Verification",
                text: `Here is your link to reset your password: \n http://localhost:3000/reset/${token}
                \n If you did not request this, please ignore this email and your password will remain unchanged. 
                \nThis link is only effective for 10 minutes after that you may choose to create a link again.`
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  return res.json({ msg: "EMAIL_SENT_SUCCESS" });
                }
              });
            }
          );
        }
      });
    } else {
      jwt.sign(
        { id: patient.id },
        config.get("jwtSecretPass"),
        { expiresIn: 600 },
        (err, token) => {
          if (err) throw err;
          let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
              user: "medXinformation@gmail.com",
              pass: "Abcd1234!"
            }
          });

          let mailOptions = {
            from: "medXinformation@gmail.com",
            to: req.body.email,
            subject: "Email Verification",
            text: `Here is your password reset link to reset your password: \n http://localhost:3000/reset/${token}
                \n If you did not request this, please ignore this email and your password will remain unchanged. 
                \nThis link is only effective for 10 minutes after that you may choose to create a password reset link again.`
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              return res.json({ msg: "EMAIL_SENT_SUCCESS" });
            }
          });
        }
      );
    }
  });
});

//Update password
router.post("/reset", pass, (req, res) => {
  const { error } = resetValidation(req.body);
  if (error)
    return res.status(400).json({
      msg: error.details[0].message
    });

  Patient.findById(req.user.id).then((patient) => {
    const { newPassword } = req.body;
    if (patient) {
      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          patient.password = newPassword;
          patient.password = hash;
          patient
            .save()
            .then(() => res.json({ msg: "UPDATE_PASSWORD_SUCCESS" }))
            .catch((err) => res.status(400).json("Error" + err));
        });
      });
    } else {
      Clinician.findById(req.user.id).then((clinician) => {
        if (clinician) {
          // Create salt & hash
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;
              clinician.password = newPassword;
              clinician.password = hash;
              clinician
                .save()
                .then(() => res.json({ msg: "UPDATE_PASSWORD_SUCCESS" }))
                .catch((err) => res.status(400).json("Error" + err));
            });
          });
        }
      });
    }
  });
});

module.exports = router;
