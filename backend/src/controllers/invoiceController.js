const prisma = require("../utils/prisma");
const { calculateInvoiceTotals } = require("../services/invoiceService");
const generateInvoicePDF = require("../utils/pdfGenerator");

async function createInvoice(req, res) {
  try {
    const { userId, clientId, invoiceNumber, issueDate, dueDate, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Invoice must contain items" });
    }

    const totals = calculateInvoiceTotals(items);

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        issueDate: new Date(issueDate),
        dueDate: new Date(dueDate),
        status: "draft",
        totalAmount: totals.grandTotal,
        taxAmount: totals.totalTax,
        userId,
        clientId
      }
    });

    res.json(invoice);

  } catch (error) {
    console.error("Create invoice error:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getInvoicesByUser(req, res) {
  try {
    const { userId } = req.params;

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: Number(userId)
      },
      include: {
        client: true
      },
      orderBy: {
        id: "desc"
      }
    });

    res.json(invoices);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
}

async function getInvoiceDetails(req, res) {
  try {
    const { invoiceId } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(invoiceId)
      },
      include: {
        client: true,
        items: true,
        payments: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.json(invoice);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch invoice details" });
  }
}

const PDFDocument = require("pdfkit");

// async function downloadInvoicePDF(req, res) {
//   try {
//     const { invoiceId } = req.params;

//     const invoice = await prisma.invoice.findUnique({
//       where: { id: Number(invoiceId) },
//       include: {
//         client: true,
//         items: true
//       }
//     });

//     if (!invoice) {
//       return res.status(404).json({ error: "Invoice not found" });
//     }

//     const doc = new PDFDocument();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=invoice-${invoice.id}.pdf`
//     );

//     doc.pipe(res);

//     doc.fontSize(20).text("Invoice", { align: "center" });
//     doc.moveDown();

//     doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
//     doc.text(`Client: ${invoice.client.name}`);
//     doc.text(`Total: ${invoice.totalAmount}`);

//     doc.end();

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to generate PDF" });
//   }
// }


async function downloadInvoicePDF(req, res) {
  try {
    const { invoiceId } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(invoiceId) },
      include: {
        client: true,
        items: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // ✅ THIS IS IMPORTANT
    generateInvoicePDF(invoice, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}

module.exports = {
  createInvoice,
  getInvoicesByUser,
  getInvoiceDetails,
  downloadInvoicePDF
};