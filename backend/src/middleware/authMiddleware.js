const jwt =
  require("jsonwebtoken");

// =====================================
// AUTH MIDDLEWARE
// =====================================

async function authMiddleware(
  req,
  res,
  next
) {

  try {

    // =====================
    // GET AUTH HEADER
    // =====================

    const authHeader =
      req.headers.authorization;

    // =====================
    // NO HEADER
    // =====================

    if (!authHeader) {

      return res.status(401).json({

        error:
          "Authorization token missing"

      });
    }

    // =====================
    // EXPECT:
    // Bearer TOKEN
    // =====================

    const parts =
      authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {

      return res.status(401).json({

        error:
          "Invalid authorization format"

      });
    }

    const token =
      parts[1];

    // =====================
    // VERIFY TOKEN
    // =====================

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET
      );

    // =====================
    // ATTACH USER
    // =====================

    req.userId =
      decoded.userId;

    next();

  } catch (error) {

    console.error(
      "AUTH ERROR:",
      error
    );

    // =====================
    // TOKEN EXPIRED
    // =====================

    if (
      error.name ===
      "TokenExpiredError"
    ) {

      return res.status(401).json({

        error:
          "Token expired"

      });
    }

    // =====================
    // INVALID TOKEN
    // =====================

    return res.status(401).json({

      error:
        "Invalid token"

    });
  }
}

module.exports =
  authMiddleware;