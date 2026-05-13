// import { Router } from "express";
// const router = Router();

// import { createClient, getClientsByUser } from "../controllers/clientController";

// router.post("/", createClient);
// router.get("/:userId", getClientsByUser);

// export default router;

const express = require("express");
const router = express.Router();
const { createClient, getClientsByUser, deleteClient } = require("../controllers/clientController");

const clientController = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");

// router.post("/", clientController.createClient);
router.post("/", authMiddleware, createClient);
router.get("/:userId", authMiddleware, getClientsByUser);
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;