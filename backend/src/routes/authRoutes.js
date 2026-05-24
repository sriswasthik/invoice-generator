const express =
  require("express");

const router =
  express.Router();

const {

  signup,

  login

} = require(
  "../controllers/authController"
);

// =====================================
// AUTH ROUTES
// =====================================

// Create account
router.post(
  "/signup",
  signup
);

// Login account
router.post(
  "/login",
  login
);

module.exports =
  router;