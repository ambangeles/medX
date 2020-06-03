const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-link");

  // Check for token
  if (!token) return res.status(401).json({ msg: "Password reset denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecretPass"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res
      .status(400)
      .json({ msg: "Invalid or expired Link. Please generate another one" });
  }
}

module.exports = auth;
