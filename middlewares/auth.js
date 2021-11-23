const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied, No token given");

  try {
    req.user = jwt.verify(token, config.get("jwtPrivateKey"));
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid Token");
  }
};
