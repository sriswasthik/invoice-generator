// backend/src/services/invoiceService.js

function calculateInvoiceTotals(items) {
  let subtotal = 0;
  let totalTax = 0;

  const processedItems = items.map((item) => {
    const quantity = Number(item.quantity);
    const price = Number(item.price);
    const taxPercent = Number(item.taxPercent);

    const itemTotal = quantity * price;
    const itemTax = itemTotal * (taxPercent / 100);

    subtotal += itemTotal;
    totalTax += itemTax;

    return {
      description: item.description,
      quantity,
      price,
      taxPercent,
      itemTotal,
      itemTax
    };
  });

  const grandTotal = subtotal + totalTax;

  return {
    items: processedItems,
    subtotal,
    totalTax,
    grandTotal
  };
}

module.exports = {
  calculateInvoiceTotals
};