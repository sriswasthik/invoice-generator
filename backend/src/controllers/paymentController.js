const prisma =
  require("../utils/prisma");

// =====================================
// CREATE PAYMENT
// =====================================

async function createPayment(
  req,
  res
) {

  try {

    let {
      invoiceId,
      amount,
      method
    } = req.body;

    // =====================
    // VALIDATION
    // =====================

    if (
      !invoiceId ||
      !amount
    ) {

      return res.status(400).json({

        error:
          "Invoice ID and amount are required"

      });
    }

    amount =
      Number(amount);

    invoiceId =
      Number(invoiceId);

    if (
      isNaN(amount) ||
      amount <= 0
    ) {

      return res.status(400).json({

        error:
          "Invalid payment amount"

      });
    }

    // =====================
    // FIND INVOICE
    // =====================

    const invoice =
      await prisma.invoice.findFirst({

        where: {

          id:
            invoiceId,

          userId:
            req.userId
        },

        include: {

          payments: true
        }

      });

    if (!invoice) {

      return res.status(404).json({

        error:
          "Invoice not found"

      });
    }

    // =====================
    // CALCULATE EXISTING PAYMENTS
    // =====================

    const totalPaid =
      invoice.payments.reduce(

        (sum, payment) =>

          sum + payment.amount,

        0
      );

    const remainingAmount =
      invoice.totalAmount -
      totalPaid;

    // =====================
    // PREVENT OVERPAYMENT
    // =====================

    if (
      amount >
      remainingAmount
    ) {

      return res.status(400).json({

        error:
          `Payment exceeds remaining balance of ₹${remainingAmount}`

      });
    }

    // =====================
    // CREATE PAYMENT
    // =====================

    const payment =
      await prisma.payment.create({

        data: {

          invoiceId,

          amount,

          method:
            method || "manual",

          paymentDate:
            new Date()

        }

      });

    // =====================
    // NEW TOTALS
    // =====================

    const updatedTotalPaid =
      totalPaid + amount;

    let invoiceStatus =
      "draft";

    if (
      updatedTotalPaid >=
      invoice.totalAmount
    ) {

      invoiceStatus =
        "paid";

    } else if (
      updatedTotalPaid > 0
    ) {

      invoiceStatus =
        "partial";
    }

    // =====================
    // UPDATE INVOICE STATUS
    // =====================

    await prisma.invoice.update({

      where: {
        id:
          invoiceId
      },

      data: {

        status:
          invoiceStatus
      }

    });

    // =====================
    // RESPONSE
    // =====================

    res.status(201).json({

      message:
        "Payment recorded successfully",

      payment,

      invoiceStatus,

      totalPaid:
        updatedTotalPaid,

      remainingAmount:
        invoice.totalAmount -
        updatedTotalPaid

    });

  } catch (error) {

    console.error(
      "PAYMENT ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Failed to record payment"

    });
  }
}

module.exports = {

  createPayment
};