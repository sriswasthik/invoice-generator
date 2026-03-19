const express = require("express");
const router = express.Router();

const { createPayment } = require("../controllers/paymentController");

router.post("/", createPayment);

// app.use("/api/payments", paymentRoutes);

module.exports = router;