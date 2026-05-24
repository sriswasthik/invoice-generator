const PDFDocument =
  require("pdfkit");

// =====================================
// PDF GENERATOR
// =====================================

function generateInvoicePDF(
  invoice,
  res
) {

  const doc =
    new PDFDocument({

      margin: 50,

      size: "A4"

    });

  // =====================================
  // RESPONSE HEADERS
  // =====================================

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(

    "Content-Disposition",

    `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`
  );

  doc.pipe(res);

  // =====================================
  // COLORS
  // =====================================

  const primary =
    "#4f46e5";

  const textDark =
    "#0f172a";

  const textMuted =
    "#64748b";

  const border =
    "#e2e8f0";

  const bgLight =
    "#f8fafc";

  // =====================================
  // TOP HEADER
  // =====================================

  doc
    .rect(
      0,
      0,
      doc.page.width,
      90
    )
    .fill(primary);

  doc
    .fillColor("white")

    .fontSize(28)

    .font("Helvetica-Bold")

    .text(
      "INVOICE",
      50,
      28
    );

  doc
    .fontSize(11)

    .font("Helvetica")

    .text(
      "Professional Invoice Document",
      50,
      62
    );

  // =====================================
  // BUSINESS INFO
  // =====================================

  doc.fillColor(
    textDark
  );

  doc
    .fontSize(18)

    .font("Helvetica-Bold")

    .text(
      "InvoiceOS",
      50,
      120
    );

  doc
    .fontSize(10)

    .font("Helvetica")

    .fillColor(
      textMuted
    )

    .text(
      "Modern Invoice Platform",
      50,
      145
    )

    .text(
      "Hyderabad, India",
      50,
      160
    )

    .text(
      "support@invoiceos.com",
      50,
      175
    );

  // =====================================
  // INVOICE META
  // =====================================

  doc
    .fillColor(
      textDark
    )

    .fontSize(10)

    .font("Helvetica-Bold")

    .text(
      "Invoice Number",
      380,
      120
    )

    .font("Helvetica")

    .fillColor(
      textMuted
    )

    .text(
      invoice.invoiceNumber,
      380,
      136
    );

  doc
    .fillColor(
      textDark
    )

    .font("Helvetica-Bold")

    .text(
      "Issue Date",
      380,
      160
    )

    .font("Helvetica")

    .fillColor(
      textMuted
    )

    .text(

      new Date(
        invoice.issueDate
      ).toDateString(),

      380,
      176
    );

  doc
    .fillColor(
      textDark
    )

    .font("Helvetica-Bold")

    .text(
      "Due Date",
      380,
      200
    )

    .font("Helvetica")

    .fillColor(
      textMuted
    )

    .text(

      new Date(
        invoice.dueDate
      ).toDateString(),

      380,
      216
    );

  // =====================================
  // CLIENT SECTION
  // =====================================

  doc
    .roundedRect(
      50,
      260,
      500,
      100,
      12
    )
    .fill(bgLight);

  doc
    .fillColor(
      textDark
    )

    .fontSize(12)

    .font("Helvetica-Bold")

    .text(
      "Billed To",
      70,
      280
    );

  doc
    .fontSize(16)

    .text(
      invoice.client.name,
      70,
      305
    );

  doc
    .font("Helvetica")

    .fontSize(10)

    .fillColor(
      textMuted
    )

    .text(
      invoice.client.email || "",
      70,
      332
    )

    .text(
      invoice.client.address || "",
      70,
      348
    );

  // =====================================
  // TABLE HEADER
  // =====================================

  const tableTop = 410;

  doc
    .roundedRect(
      50,
      tableTop,
      500,
      36,
      8
    )
    .fill(primary);

  doc
    .fillColor("white")

    .font("Helvetica-Bold")

    .fontSize(11)

    .text(
      "Description",
      70,
      tableTop + 12
    )

    .text(
      "Qty",
      300,
      tableTop + 12
    )

    .text(
      "Price",
      370,
      tableTop + 12
    )

    .text(
      "Amount",
      460,
      tableTop + 12
    );

  // =====================================
  // TABLE ROWS
  // =====================================

  let position =
    tableTop + 50;

  invoice.items.forEach(
    (item, index) => {

      const amount =
        item.quantity *
        item.price;

      // row bg
      doc
        .roundedRect(
          50,
          position - 8,
          500,
          34,
          6
        )
        .fill(
          index % 2 === 0
            ? "#ffffff"
            : "#f8fafc"
        );

      doc
        .fillColor(
          textDark
        )

        .fontSize(10)

        .font("Helvetica")

        .text(
          item.description,
          70,
          position
        )

        .text(
          item.quantity.toString(),
          300,
          position
        )

        .text(
          `₹${item.price}`,
          370,
          position
        )

        .text(
          `₹${amount}`,
          460,
          position
        );

      position += 42;
    }
  );

  // =====================================
  // TOTAL CARD
  // =====================================

  const totalBoxY =
    position + 35;

  doc
    .roundedRect(
      320,
      totalBoxY,
      230,
      120,
      16
    )
    .fill(bgLight);

  const subtotal =
    invoice.totalAmount -
    invoice.taxAmount;

  doc
    .fillColor(
      textMuted
    )

    .fontSize(11)

    .font("Helvetica")

    .text(
      "Subtotal",
      340,
      totalBoxY + 20
    )

    .text(
      `₹${subtotal}`,
      470,
      totalBoxY + 20
    );

  doc
    .text(
      "Tax",
      340,
      totalBoxY + 48
    )

    .text(
      `₹${invoice.taxAmount}`,
      470,
      totalBoxY + 48
    );

  doc
    .moveTo(
      340,
      totalBoxY + 78
    )

    .lineTo(
      520,
      totalBoxY + 78
    )

    .strokeColor(border)

    .stroke();

  doc
    .fillColor(
      textDark
    )

    .font("Helvetica-Bold")

    .fontSize(14)

    .text(
      "Total",
      340,
      totalBoxY + 90
    )

    .text(
      `₹${invoice.totalAmount}`,
      460,
      totalBoxY + 90
    );

  // =====================================
  // STATUS BADGE
  // =====================================

  const badgeColor =
    invoice.status === "paid"
      ? "#22c55e"
      : invoice.status ===
        "partial"
      ? "#f59e0b"
      : "#64748b";

  doc
    .roundedRect(
      50,
      totalBoxY + 20,
      110,
      36,
      18
    )
    .fill(
      badgeColor
    );

  doc
    .fillColor("white")

    .font("Helvetica-Bold")

    .fontSize(11)

    .text(
      invoice.status.toUpperCase(),
      76,
      totalBoxY + 33
    );

  // =====================================
  // FOOTER
  // =====================================

  doc
    .fillColor(
      textMuted
    )

    .fontSize(10)

    .font("Helvetica")

    .text(

      "Thank you for your business.",

      50,

      760,

      {
        align: "center"
      }
    );

  doc.end();
}

module.exports =
  generateInvoicePDF;