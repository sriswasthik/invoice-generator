// const PDFDocument = require("pdfkit");

// function generateInvoicePDF(invoice, res) {

//   const doc = new PDFDocument({ margin: 50 });

//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`
//   );

//   doc.pipe(res);

//   // ===== HEADER =====
//   doc
//     .fontSize(20)
//     .text("Your Business Name", { align: "left" });

//   doc
//     .fontSize(10)
//     .text("Your Address Line", { align: "left" })
//     .text("GSTIN: XXXXXXXX");

//   doc.moveUp();

//   doc
//     .fontSize(20)
//     .text("INVOICE", { align: "right" });

//   doc.moveDown(2);

//   // ===== CLIENT + INVOICE INFO =====
//   doc.fontSize(12);

//   doc.text("Bill To:", { continued: true });
//   doc.text(` ${invoice.client.name}`);

//   doc.text(invoice.client.address || "");
//   doc.text(invoice.client.email || "");

//   doc.moveUp();

//   doc.text(`Invoice #: ${invoice.invoiceNumber}`, { align: "right" });
//   doc.text(`Issue Date: ${new Date(invoice.issueDate).toDateString()}`, { align: "right" });
//   doc.text(`Due Date: ${new Date(invoice.dueDate).toDateString()}`, { align: "right" });

//   doc.moveDown(2);

//   // ===== TABLE HEADER =====
//   const tableTop = doc.y;

//   doc.fontSize(12).text("Description", 50, tableTop);
//   doc.text("Qty", 250, tableTop);
//   doc.text("Price", 300, tableTop);
//   doc.text("Total", 400, tableTop);

//   doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

//   let position = tableTop + 25;

//   // ===== TABLE ROWS =====
//   invoice.items.forEach((item) => {

//     const total = item.quantity * item.price;

//     doc.text(item.description, 50, position);
//     doc.text(item.quantity.toString(), 250, position);
//     doc.text(`₹${item.price}`, 300, position);
//     doc.text(`₹${total}`, 400, position);

//     position += 25;
//   });

//   doc.moveDown(2);

//   // ===== TOTALS =====
//   const totalsY = position + 20;

//   doc.text(`Subtotal: ₹${invoice.totalAmount - invoice.taxAmount}`, 350, totalsY);
//   doc.text(`Tax: ₹${invoice.taxAmount}`, 350, totalsY + 20);

//   doc
//     .font("Helvetica-Bold")
//     .text(`Total: ₹${invoice.totalAmount}`, 350, totalsY + 40);

//   doc.font("Helvetica");

//   // ===== FOOTER =====
//   doc.moveDown(4);

//   doc
//     .fontSize(10)
//     .text("Thank you for your business!", { align: "center" });

//   doc.end();
// }

// module.exports = generateInvoicePDF;


const PDFDocument = require("pdfkit");

function generateInvoicePDF(invoice, res) {

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`
  );

  doc.pipe(res);

  // ===== TOP COLOR BAR =====
  doc
    .rect(0, 0, doc.page.width, 60)
    .fill("#5b5bd6");

  doc
    .fillColor("white")
    .fontSize(20)
    .text("INVOICE", 50, 20);

  doc.fillColor("black");

  doc.moveDown(2);

  // ===== BUSINESS INFO =====
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Your Business Name", 50, 80);

  doc
    .font("Helvetica")
    .fontSize(10)
    .text("Address Line", 50, 100)
    .text("GSTIN: XXXXXXXX", 50, 115);

  // ===== INVOICE INFO RIGHT =====
  doc
    .fontSize(10)
    .text(`Invoice #: ${invoice.invoiceNumber}`, 400, 80)
    .text(`Date: ${new Date(invoice.issueDate).toDateString()}`, 400, 95)
    .text(`Due: ${new Date(invoice.dueDate).toDateString()}`, 400, 110);

  doc.moveDown(3);

  // ===== CLIENT =====
  doc
    .font("Helvetica-Bold")
    .text("Bill To:", 50, 150);

  doc
    .font("Helvetica")
    .text(invoice.client.name, 50, 165)
    .text(invoice.client.address || "", 50, 180)
    .text(invoice.client.email || "", 50, 195);

  // ===== TABLE HEADER =====
  const tableTop = 240;

  doc
    .font("Helvetica-Bold")
    .text("Description", 50, tableTop)
    .text("Qty", 250, tableTop)
    .text("Price", 320, tableTop)
    .text("Total", 420, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  let position = tableTop + 25;

  // ===== TABLE ROWS =====
  doc.font("Helvetica");

  invoice.items.forEach((item) => {

    const total = item.quantity * item.price;

    doc.text(item.description, 50, position);
    doc.text(item.quantity.toString(), 250, position);
    doc.text(`₹${item.price}`, 320, position);
    doc.text(`₹${total}`, 420, position);

    position += 25;
  });

  // ===== TOTAL BOX =====
  const boxY = position + 30;

  doc
    .rect(300, boxY, 250, 90)
    .fill("#f1f5f9");

  doc.fillColor("black");

  doc.text(`Subtotal: ₹${invoice.totalAmount - invoice.taxAmount}`, 320, boxY + 15);
  doc.text(`Tax: ₹${invoice.taxAmount}`, 320, boxY + 35);

  doc
    .font("Helvetica-Bold")
    .text(`Total: ₹${invoice.totalAmount}`, 320, boxY + 60);

  doc.font("Helvetica");

  // ===== FOOTER =====
  doc
    .fontSize(10)
    .fillColor("#64748b")
    .text("Thank you for your business!", 50, 700, { align: "center" });

  doc.end();
}

module.exports = generateInvoicePDF;