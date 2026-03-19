const prisma = require("../utils/prisma");

async function createPayment(req, res) {
  try {
    const { invoiceId, amount, method } = req.body;

    if (!invoiceId || !amount) {
      return res.status(400).json({ error: "invoiceId and amount are required" });
    }

    const payment = await prisma.payment.create({
      data: {
        invoiceId,
        amount,
        method: method || "manual",
        paymentDate: new Date()
      }
    });

    // Calculate total paid for this invoice
    const payments = await prisma.payment.findMany({
      where: {
        invoiceId: Number(invoiceId)
      }
    });

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    const invoice = await prisma.invoice.findUnique({
      
      where: { id: Number(invoiceId) }
      
    });

    let status = "draft";

    if (totalPaid >= invoice.totalAmount) {
      status = "paid";
    } else if (totalPaid > 0) {
      status = "partial";
    }

    await prisma.invoice.update({
      where: { id: Number(invoiceId) },
      data: { status }
    });

    res.json({
      payment,
      totalPaid,
      invoiceStatus: status
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record payment" });
  }
}

async function downloadInvoicePDF(req, res) {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        client: true,
        items: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    generateInvoicePDF(invoice, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}

module.exports = {
  createPayment
};