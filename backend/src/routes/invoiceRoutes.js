// const express = require("express");
// const router = express.Router();

// const { createInvoice } = require("../controllers/invoiceController");

// router.post("/", createInvoice);

// module.exports = router;
// ===============================
// const express = require("express");
// const router = express.Router();

// const { createInvoice } = require("../controllers/invoiceController");
// const prisma = require("../utils/prisma");

// // Create invoice
// router.post("/", createInvoice);

// // Get all invoices
// router.get("/", async (req, res) => {
//   try {
//     const invoices = await prisma.invoice.findMany({
//       include: {
//         items: true,
//         client: true
//       }
//     });

//     res.json(invoices);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch invoices" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   createInvoice,
//   getInvoicesByUser,
//   getInvoiceDetails
// } = require("../controllers/invoiceController");

// const {
//   createInvoice,
//   getInvoicesByUser,
//   getInvoiceDetails,
//   downloadInvoicePDF
// } = require("../controllers/invoiceController");

// router.post("/", createInvoice);

// router.get("/:userId", getInvoicesByUser);
// router.get("/details/:invoiceId", getInvoiceDetails);
// router.get("/:id/pdf", downloadInvoicePDF);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoicesByUser,
  getInvoiceDetails,
  downloadInvoicePDF
} = require("../controllers/invoiceController");

router.post("/", createInvoice);

router.get("/details/:invoiceId", getInvoiceDetails);
router.get("/:invoiceId/pdf", downloadInvoicePDF);
router.get("/:userId", getInvoicesByUser);

module.exports = router;