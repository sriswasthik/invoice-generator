const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createClient,
  getClientsByUser,
  deleteClient
} = require("../controllers/clientController");


// =============================
// Client Routes
// =============================

// Get all clients for logged-in user
router.get(
  "/",
  authMiddleware,
  getClientsByUser
);

// Create new client
router.post(
  "/",
  authMiddleware,
  createClient
);

// Delete client
router.delete(
  "/:id",
  authMiddleware,
  deleteClient
);

module.exports = router;