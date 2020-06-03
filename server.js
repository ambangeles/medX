const express = require("express");
const mongoose = require("mongoose");
const clinicians = require("./routes/api/users.clinician");
const patients = require("./routes/api/users.patient");
const blockchainP = require("./routes/api/blockchain.patient");
const blockchainC = require("./routes/api/blockchain.clinician");
const path = require("path");

const login = require("./routes/api/login");
const config = require("config");
const app = express();

app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
  .set("useNewUrlParser", true)
  .set("useUnifiedTopology", true)
  .set("useCreateIndex", true)
  .set("useFindAndModify", false)
  .connect(db)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/patient", patients);
app.use("/api/patient", blockchainP);
app.use("/api/clinician", blockchainC);
app.use("/api/clinician", clinicians);
app.use("/api", login);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
