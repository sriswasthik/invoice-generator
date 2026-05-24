const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {

  try {

    const authHeader = req.headers.authorization;

    // no token
    if (!authHeader) {
      return res.status(401).json({
        error: "Access denied. No token provided."
      });
    }

    // extract token
    let token = authHeader;

    // handle "Bearer TOKEN"
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // attach user info
    req.userId = decoded.userId;

    next();

  } catch (error) {

    console.error(error);

    return res.status(401).json({
      error: "Invalid or expired token"
    });
  }
}

module.exports = authMiddleware;