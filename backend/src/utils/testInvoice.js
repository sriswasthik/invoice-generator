const {

  calculateInvoiceTotals

} = require(
  "../services/invoiceService"
);

// =====================================
// TEST DATA
// =====================================

const items = [

  {

    description:
      "UI Design System",

    quantity: 2,

    price: 4000,

    taxPercent: 18
  },

  {

    description:
      "Frontend Development",

    quantity: 1,

    price: 12000,

    taxPercent: 18
  },

  {

    description:
      "Cloud Hosting",

    quantity: 3,

    price: 1500,

    taxPercent: 18
  }

];

// =====================================
// RUN TEST
// =====================================

try {

  const result =
    calculateInvoiceTotals(
      items
    );

  // =====================================
  // OUTPUT
  // =====================================

  console.log(
    "\n=================================="
  );

  console.log(
    "INVOICE CALCULATION TEST"
  );

  console.log(
    "==================================\n"
  );

  // ITEMS

  result.items.forEach(
    (item, index) => {

      console.log(
        `Item ${index + 1}`
      );

      console.log(
        "------------------------"
      );

      console.log(
        "Description:",
        item.description
      );

      console.log(
        "Quantity:",
        item.quantity
      );

      console.log(
        "Price:",
        `₹${item.price}`
      );

      console.log(
        "Tax:",
        `${item.taxPercent}%`
      );

      console.log(
        "Subtotal:",
        `₹${item.subtotal}`
      );

      console.log(
        "Item Tax:",
        `₹${item.tax}`
      );

      console.log(
        "Item Total:",
        `₹${item.total}`
      );

      console.log("");
    }
  );

  // TOTALS

  console.log(
    "=================================="
  );

  console.log(
    "FINAL TOTALS"
  );

  console.log(
    "=================================="
  );

  console.log(
    "Subtotal:",
    `₹${result.subtotal}`
  );

  console.log(
    "Total Tax:",
    `₹${result.totalTax}`
  );

  console.log(
    "Grand Total:",
    `₹${result.grandTotal}`
  );

  console.log("");

} catch (error) {

  console.error(
    "\nTEST FAILED\n"
  );

  console.error(error);
}