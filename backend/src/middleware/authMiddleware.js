// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) return res.status(401).json({ error: "No token" });

//   const decoded = jwt.verify(token, "secret");

//   req.userId = decoded.userId;

//   next();
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        error: "No token provided"
      });
    }

    const decoded = jwt.verify(
      token,
      "secret123"
    );

    req.userId = decoded.userId;

    next();

  } catch (err) {

    return res.status(401).json({
      error: "Invalid token"
    });
  }
};