import getPublicInvoice from "./invoiceController.js"; 

router.get("/public/:invoiceId", getPublicInvoice);

const prisma =
  require("../utils/prisma");

const {
  calculateInvoiceTotals
} = require(
  "../services/invoiceService"
);

const generateInvoicePDF =
  require(
    "../utils/pdfGenerator"
  );

// =====================================
// CREATE INVOICE
// =====================================

async function createInvoice(
  req,
  res
) {

  try {

    const {

      clientId,

      invoiceNumber,

      issueDate,

      dueDate,

      items

    } = req.body;

    // =====================
    // VALIDATION
    // =====================

    if (
      !clientId ||
      !invoiceNumber ||
      !issueDate ||
      !dueDate
    ) {

      return res.status(400).json({

        error:
          "Missing required invoice fields"

      });
    }

    if (
      !items ||
      items.length === 0
    ) {

      return res.status(400).json({

        error:
          "Invoice must contain at least one item"

      });
    }

    // =====================
    // VERIFY CLIENT OWNERSHIP
    // =====================

    const client =
      await prisma.client.findFirst({

        where: {

          id:
            Number(clientId),

          userId:
            req.userId
        }

      });

    if (!client) {

      return res.status(404).json({

        error:
          "Client not found"

      });
    }

    // =====================
    // CALCULATE TOTALS
    // =====================

    const totals =
      calculateInvoiceTotals(
        items
      );

    // =====================
    // CREATE INVOICE
    // =====================

    const invoice =
      await prisma.invoice.create({

        data: {

          invoiceNumber,

          issueDate:
            new Date(issueDate),

          dueDate:
            new Date(dueDate),

          status: "draft",

          totalAmount:
            totals.grandTotal,

          taxAmount:
            totals.totalTax,

          userId:
            req.userId,

          clientId:
            Number(clientId),

          items: {

            create:
              items.map(
                (item) => ({

                  description:
                    item.description,

                  quantity:
                    Number(
                      item.quantity
                    ),

                  price:
                    Number(
                      item.price
                    ),

                  taxPercent:
                    Number(
                      item.taxPercent || 0
                    ),

                  amount:
                    (
                      Number(
                        item.quantity
                      ) *
                      Number(
                        item.price
                      )
                    )

                })
              )

          }

        },

        include: {

          client: true,

          items: true

        }

      });

    // =====================
    // RESPONSE
    // =====================

    res.status(201).json({

      message:
        "Invoice created successfully",

      invoice

    });

  } catch (error) {

    console.error(
      "CREATE INVOICE ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to create invoice"

    });
  }
}

// =====================================
// GET USER INVOICES
// =====================================

async function getInvoicesByUser(
  req,
  res
) {

  try {

    const invoices =
      await prisma.invoice.findMany({

        where: {
          userId:
            req.userId
        },

        include: {

          client: true,

          items: true,

          payments: true

        },

        orderBy: {
          createdAt:
            "desc"
        }

      });

    res.status(200).json(
      invoices
    );

  } catch (error) {

    console.error(
      "GET INVOICES ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to fetch invoices"

    });
  }
}

// =====================================
// GET SINGLE INVOICE
// =====================================

async function getInvoiceDetails(
  req,
  res
) {

  try {

    const invoiceId =
      Number(
        req.params.id
      );

    const invoice =
      await prisma.invoice.findFirst({

        where: {

          id:
            invoiceId,

          userId:
            req.userId
        },

        include: {

          client: true,

          items: true,

          payments: true

        }

      });

    if (!invoice) {

      return res.status(404).json({

        error:
          "Invoice not found"

      });
    }

    res.status(200).json(
      invoice
    );

  } catch (error) {

    console.error(
      "GET INVOICE ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to fetch invoice"

    });
  }
}

// =====================================
// PUBLIC INVOICE
// =====================================

async function getPublicInvoice(
  req,
  res
) {

  try {

    const invoiceId =
      Number(
        req.params.id
      );

    const invoice =
      await prisma.invoice.findUnique({

        where: {
          id:
            invoiceId
        },

        include: {

          client: true,

          items: true

        }

      });

    if (!invoice) {

      return res.status(404).json({

        error:
          "Invoice not found"

      });
    }

    res.status(200).json(
      invoice
    );

  } catch (error) {

    console.error(
      "PUBLIC INVOICE ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to fetch public invoice"

    });
  }
}

// =====================================
// DOWNLOAD PDF
// =====================================

async function downloadInvoicePDF(
  req,
  res
) {

  try {

    const invoiceId =
      Number(
        req.params.id
      );

    const invoice =
      await prisma.invoice.findFirst({

        where: {

          id:
            invoiceId,

          userId:
            req.userId
        },

        include: {

          client: true,

          items: true

        }

      });

    if (!invoice) {

      return res.status(404).json({

        error:
          "Invoice not found"

      });
    }

    generateInvoicePDF(
      invoice,
      res
    );

  } catch (error) {

    console.error(
      "PDF ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to generate PDF"

    });
  }
}

module.exports = {

  createInvoice,

  getInvoicesByUser,

  getInvoiceDetails,

  getPublicInvoice,

  downloadInvoicePDF
};