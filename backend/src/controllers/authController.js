// const prisma = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// exports.signup = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // check if user exists
//     const existing = await prisma.user.findUnique({
//       where: { email }
//     });

//     if (existing) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: { email, password: hashed }
//     });

//     res.json({ message: "User created successfully" });

// //   } catch (err) {
// //     res.status(500).json({ error: "Signup failed" });
// //   }

//   } catch (error) {
//   console.log(error);

//   res.status(500).json({
//     error: error.message
//   });
// }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({
//     where: { email }
//   });

//   if (!user) return res.status(404).json({ error: "User not found" });

//   const valid = await bcrypt.compare(password, user.password);

//   if (!valid) return res.status(401).json({ error: "Invalid password" });

//   const token = jwt.sign({ userId: user.id }, "secret");

//   res.json({ token });
// };

const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {

  try {

    const { email, password } = req.body;

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({
      message: "Account created successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Signup failed"
    });
  }
};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // compare password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid password"
      });
    }

    // generate JWT
    const token = jwt.sign(
      {
        userId: user.id
      },
      "secret123",
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Login failed"
    });
  }
};