const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {

  createClient,

  getClientsByUser,

  deleteClient

} = require(
  "../controllers/clientController"
);

// =====================================
// CLIENT ROUTES
// =====================================

// Get all clients
router.get(
  "/",
  authMiddleware,
  getClientsByUser
);

// Create client
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

module.exports =
  router;