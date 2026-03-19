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

router.post("/", clientController.createClient);
router.get("/:userId", clientController.getClientsByUser);
router.delete("/:id", deleteClient);

module.exports = router;