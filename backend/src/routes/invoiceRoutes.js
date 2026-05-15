const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createInvoice,
  getInvoicesByUser,
  getInvoiceDetails,
  downloadInvoicePDF
} = require("../controllers/invoiceController");



// =============================
// Invoice Routes
// =============================

// Create invoice
router.post(
  "/",
  authMiddleware,
  createInvoice
);

// Get all invoices for logged-in user
router.get(
  "/",
  authMiddleware,
  getInvoicesByUser
);

// Get single invoice details
router.get(
  "/:id",
  authMiddleware,
  getInvoiceDetails
);

// Download invoice PDF
router.get(
  "/:id/pdf",
  authMiddleware,
  downloadInvoicePDF
);

router.get(
  "/public/:id",
  getInvoiceDetails
);

module.exports = router;