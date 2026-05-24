const prisma =
  require("../config/db");

const bcrypt =
  require("bcrypt");

const jwt =
  require("jsonwebtoken");

// =====================================
// SIGNUP
// =====================================

exports.signup = async (
  req,
  res
) => {

  try {

    let {
      email,
      password
    } = req.body;

    // =====================
    // VALIDATION
    // =====================

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        error:
          "Email and password are required"
      });
    }

    email =
      email.trim().toLowerCase();

    password =
      password.trim();

    if (
      password.length < 6
    ) {

      return res.status(400).json({
        error:
          "Password must be at least 6 characters"
      });
    }

    // =====================
    // CHECK EXISTING USER
    // =====================

    const existingUser =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existingUser) {

      return res.status(409).json({
        error:
          "User already exists"
      });
    }

    // =====================
    // HASH PASSWORD
    // =====================

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // =====================
    // CREATE USER
    // =====================

    const user =
      await prisma.user.create({

        data: {
          email,
          password:
            hashedPassword
        }

      });

    // =====================
    // TOKEN
    // =====================

    const token = jwt.sign(

      {
        userId: user.id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    // =====================
    // RESPONSE
    // =====================

    res.status(201).json({

      message:
        "Account created successfully",

      token,

      user: {
        id: user.id,
        email: user.email
      }

    });

  } catch (error) {

    console.error(
      "SIGNUP ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to create account"

    });
  }
};

// =====================================
// LOGIN
// =====================================

exports.login = async (
  req,
  res
) => {

  try {

    let {
      email,
      password
    } = req.body;

    // =====================
    // VALIDATION
    // =====================

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        error:
          "Email and password are required"
      });
    }

    email =
      email.trim().toLowerCase();

    password =
      password.trim();

    // =====================
    // FIND USER
    // =====================

    const user =
      await prisma.user.findUnique({

        where: { email }

      });

    if (!user) {

      return res.status(401).json({

        error:
          "Invalid credentials"

      });
    }

    // =====================
    // CHECK PASSWORD
    // =====================

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return res.status(401).json({

        error:
          "Invalid credentials"

      });
    }

    // =====================
    // GENERATE TOKEN
    // =====================

    const token = jwt.sign(

      {
        userId: user.id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    // =====================
    // RESPONSE
    // =====================

    res.status(200).json({

      token,

      user: {
        id: user.id,
        email: user.email
      }

    });

  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Login failed"

    });
  }
};