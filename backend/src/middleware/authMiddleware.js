const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "No token" });

  const decoded = jwt.verify(token, "secret");

  req.userId = decoded.userId;

  next();
};