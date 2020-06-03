const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token1");

  // Check for token
  if (!token) return res.status(401).json({ msg: "Access Denied1" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecretAccess"));
    // Add user from payload
    req.clinician = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid 1" });
  }
}

module.exports = auth;
