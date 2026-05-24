// =====================================
// HELPERS
// =====================================

function toNumber(value) {

  const number =
    Number(value);

  return isNaN(number)
    ? 0
    : number;
}

function round(value) {

  return Number(
    value.toFixed(2)
  );
}

// =====================================
// CALCULATE TOTALS
// =====================================

function calculateInvoiceTotals(
  items = []
) {

  // =====================
  // VALIDATION
  // =====================

  if (
    !Array.isArray(items)
  ) {

    throw new Error(
      "Items must be an array"
    );
  }

  let subtotal = 0;

  let totalTax = 0;

  // =====================
  // PROCESS ITEMS
  // =====================

  const processedItems =
    items.map((item) => {

      const quantity =
        toNumber(
          item.quantity
        );

      const price =
        toNumber(
          item.price
        );

      const taxPercent =
        toNumber(
          item.taxPercent
        );

      const description =
        item.description
          ?.trim() || "";

      // =====================
      // ITEM CALCULATIONS
      // =====================

      const itemSubtotal =
        quantity * price;

      const itemTax =
        itemSubtotal *
        (taxPercent / 100);

      const itemTotal =
        itemSubtotal +
        itemTax;

      // =====================
      // GLOBAL TOTALS
      // =====================

      subtotal +=
        itemSubtotal;

      totalTax +=
        itemTax;

      // =====================
      // RETURN ITEM
      // =====================

      return {

        description,

        quantity,

        price,

        taxPercent,

        subtotal:
          round(
            itemSubtotal
          ),

        tax:
          round(itemTax),

        total:
          round(itemTotal)

      };
    });

  // =====================
  // FINAL TOTALS
  // =====================

  subtotal =
    round(subtotal);

  totalTax =
    round(totalTax);

  const grandTotal =
    round(
      subtotal +
      totalTax
    );

  // =====================
  // RESPONSE
  // =====================

  return {

    items:
      processedItems,

    subtotal,

    totalTax,

    grandTotal

  };
}

module.exports = {

  calculateInvoiceTotals
};