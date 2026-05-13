const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided"
      });
    }

    // Expected format:
    // Authorization: Bearer TOKEN
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, "secret123");

    // Attach user id to request
    req.userId = decoded.userId;

    next();

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: "Invalid token"
    });
  }
};