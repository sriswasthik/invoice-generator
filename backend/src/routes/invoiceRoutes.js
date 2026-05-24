const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {

  createInvoice,

  getInvoicesByUser,

  getInvoiceDetails,

  getPublicInvoice,

  downloadInvoicePDF

} = require(
  "../controllers/invoiceController"
);

// =====================================
// PUBLIC ROUTES
// =====================================

// Public invoice page
router.get(
  "/public/:id",
  getPublicInvoice
);

// =====================================
// PROTECTED ROUTES
// =====================================

// Create invoice
router.post(
  "/",
  authMiddleware,
  createInvoice
);

// Get all invoices
router.get(
  "/",
  authMiddleware,
  getInvoicesByUser
);

// Get single invoice
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

module.exports =
  router;