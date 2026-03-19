const { calculateInvoiceTotals } = require("../services/invoiceService");

const items = [
  {
    description: "UI Design",
    quantity: 2,
    price: 4000,
    taxPercent: 18
  },
  {
    description: "Hosting",
    quantity: 1,
    price: 2000,
    taxPercent: 18
  }
];

const result = calculateInvoiceTotals(items);

console.log(result);