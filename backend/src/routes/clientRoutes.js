import { Router } from "express";

const express = require("express");
const router = express.Router();
const { createClient, getClientsByUser, deleteClient } = require("../controllers/clientController");

const clientController = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createClient);
router.get("/:userId", authMiddleware, getClientsByUser);
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;