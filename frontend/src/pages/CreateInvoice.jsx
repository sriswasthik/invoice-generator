import { useEffect, useState } from "react";
import api from "../api/api";

function CreateInvoice() {

  const [clients, setClients] =
    useState([]);

  const [clientId, setClientId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [items, setItems] =
    useState([
      {
        description: "",
        quantity: 1,
        price: 0,
        taxPercent: 18
      }
    ]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {

    try {

      const res =
        await api.get("/clients");

      setClients(res.data);

    } catch (error) {

      console.error(error);
    }
  };

  const addItem = () => {

    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        price: 0,
        taxPercent: 18
      }
    ]);
  };

  const removeItem = (index) => {

    const updated =
      items.filter(
        (_, i) => i !== index
      );

    setItems(updated);
  };

  const updateItem = (
    index,
    field,
    value
  ) => {

    const updated = [...items];

    updated[index][field] =
      value;

    setItems(updated);
  };

  const calculateTotals = () => {

    let subtotal = 0;
    let tax = 0;

    items.forEach((item) => {

      const qty =
        Number(item.quantity);

      const price =
        Number(item.price);

      const taxPercent =
        Number(item.taxPercent);

      const itemTotal =
        qty * price;

      const itemTax =
        itemTotal *
        (taxPercent / 100);

      subtotal += itemTotal;

      tax += itemTax;
    });

    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const totals =
    calculateTotals();

  const createInvoice =
    async (e) => {

      e.preventDefault();

      if (!clientId) {

        return alert(
          "Select a client"
        );
      }

      try {

        setLoading(true);

        const invoiceNumber =
          "INV-" + Date.now();

        await api.post(
          "/invoices",
          {
            clientId:
              Number(clientId),

            invoiceNumber,

            issueDate:
              new Date(),

            dueDate:
              new Date(
                Date.now() +
                7 * 24 * 60 * 60 * 1000
              ),

            items
          }
        );

        alert(
          "Invoice Created"
        );

        setItems([
          {
            description: "",
            quantity: 1,
            price: 0,
            taxPercent: 18
          }
        ]);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to create invoice"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div style={styles.page}>

      {/* LEFT */}

      <div style={styles.formCard}>

        <div style={styles.header}>

          <h2 style={styles.title}>
            Create Invoice
          </h2>

          <p style={styles.subtitle}>
            Generate professional
            invoices for clients
          </p>

        </div>

        <form
          onSubmit={createInvoice}
        >

          {/* CLIENT */}

          <div style={styles.section}>

            <label style={styles.label}>
              Select Client
            </label>

            <select
              value={clientId}
              onChange={(e) =>
                setClientId(
                  e.target.value
                )
              }
              style={styles.select}
            >

              <option value="">
                Choose Client
              </option>

              {clients.map(
                (client) => (

                  <option
                    key={client.id}
                    value={client.id}
                  >
                    {client.name}
                  </option>

                )
              )}

            </select>

          </div>

          {/* ITEMS */}

          <div style={styles.section}>

            <div
              style={styles.itemsHeader}
            >

              <h3>
                Invoice Items
              </h3>

              <button
                type="button"
                style={styles.addItemBtn}
                onClick={addItem}
              >
                + Add Item
              </button>

            </div>

            {items.map(
              (item, index) => (

                <div
                  key={index}
                  style={styles.itemCard}
                >

                  <input
                    placeholder="Description"
                    value={
                      item.description
                    }
                    onChange={(e) =>
                      updateItem(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    style={
                      styles.input
                    }
                  />

                  <div
                    style={
                      styles.row
                    }
                  >

                    <input
                      type="number"
                      placeholder="Qty"
                      value={
                        item.quantity
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      style={
                        styles.smallInput
                      }
                    />

                    <input
                      type="number"
                      placeholder="Price"
                      value={
                        item.price
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "price",
                          e.target.value
                        )
                      }
                      style={
                        styles.smallInput
                      }
                    />

                    <input
                      type="number"
                      placeholder="Tax %"
                      value={
                        item.taxPercent
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "taxPercent",
                          e.target.value
                        )
                      }
                      style={
                        styles.smallInput
                      }
                    />

                  </div>

                  {items.length >
                    1 && (

                    <button
                      type="button"
                      style={
                        styles.removeBtn
                      }
                      onClick={() =>
                        removeItem(
                          index
                        )
                      }
                    >
                      Remove
                    </button>

                  )}

                </div>

              )
            )}

          </div>

          <button
            type="submit"
            style={styles.createBtn}
          >

            {loading
              ? "Creating..."
              : "Create Invoice"}

          </button>

        </form>

      </div>

      {/* RIGHT */}

      <div style={styles.summaryCard}>

        <h3 style={styles.summaryTitle}>
          Invoice Summary
        </h3>

        <div style={styles.summaryRow}>
          <span>Subtotal</span>
          <strong>
            ₹{totals.subtotal}
          </strong>
        </div>

        <div style={styles.summaryRow}>
          <span>Tax</span>
          <strong>
            ₹{totals.tax}
          </strong>
        </div>

        <div style={styles.divider} />

        <div style={styles.totalRow}>
          <span>Total</span>

          <strong>
            ₹{totals.total}
          </strong>
        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    display: "grid",
    gridTemplateColumns:
      "1fr 360px",
    gap: "28px",
    alignItems: "start"
  },

  formCard: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)"
  },

  header: {
    marginBottom: "28px"
  },

  title: {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "8px"
  },

  subtitle: {
    color: "#64748b"
  },

  section: {
    marginBottom: "28px"
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "600"
  },

  select: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbe3ec",
    outline: "none"
  },

  itemsHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "18px"
  },

  addItemBtn: {
    background: "#eef2ff",
    color: "#4338ca",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  },

  itemCard: {
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "18px",
    border: "1px solid #e2e8f0"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbe3ec",
    marginBottom: "14px",
    outline: "none"
  },

  row: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: "12px"
  },

  smallInput: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbe3ec",
    outline: "none"
  },

  removeBtn: {
    marginTop: "14px",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    padding: "10px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  },

  createBtn: {
    width: "100%",
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700"
  },

  summaryCard: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",
    position: "sticky",
    top: "20px"
  },

  summaryTitle: {
    marginBottom: "24px",
    fontSize: "24px"
  },

  summaryRow: {
    display: "flex",
    justifyContent:
      "space-between",
    marginBottom: "16px",
    color: "#475569"
  },

  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "20px 0"
  },

  totalRow: {
    display: "flex",
    justifyContent:
      "space-between",
    fontSize: "22px",
    fontWeight: "700"
  }

};

export default CreateInvoice;