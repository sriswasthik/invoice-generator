import api from "../api/api";

import { useState }
from "react";

function InvoiceCard({
  invoice
}) {

  const [paymentAmount,
    setPaymentAmount] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const downloadPDF = () => {

    window.open(
      `${import.meta.env.VITE_API_URL}/invoices/${invoice.id}/pdf`,
      "_blank"
    );
  };

  const recordPayment =
    async () => {

      if (!paymentAmount) {

        return alert(
          "Enter payment amount"
        );
      }

      try {

        setLoading(true);

        await api.post(
          "/payments",
          {
            invoiceId: invoice.id,
            amount:
              Number(
                paymentAmount
              ),
            method: "manual"
          }
        );

        alert(
          "Payment recorded"
        );

        window.location.reload();

      } catch (err) {

        console.error(err);

        alert(
          "Payment failed"
        );

      } finally {

        setLoading(false);
      }
    };

  const copyShareLink = () => {

    const url =
      `${window.location.origin}/invoice/public/${invoice.id}`;

    navigator.clipboard.writeText(
      url
    );

    alert(
      "Invoice link copied"
    );
  };

  const getStatusStyles = () => {

    switch (
      invoice.status
    ) {

      case "paid":

        return {
          background:
            "#dcfce7",
          color:
            "#166534"
        };

      case "partial":

        return {
          background:
            "#fef3c7",
          color:
            "#92400e"
        };

      default:

        return {
          background:
            "#e2e8f0",
          color:
            "#475569"
        };
    }
  };

  return (

    <div style={styles.card}>

      {/* TOP */}

      <div style={styles.top}>

        <div>

          <p style={styles.label}>
            Invoice
          </p>

          <h3 style={styles.invoiceNo}>
            {
              invoice.invoiceNumber
            }
          </h3>

        </div>

        <div
          style={{
            ...styles.status,
            ...getStatusStyles()
          }}
        >

          {invoice.status}

        </div>

      </div>

      {/* CLIENT */}

      <div style={styles.clientSection}>

        <div>

          <p style={styles.smallLabel}>
            Client
          </p>

          <h4 style={styles.clientName}>
            {
              invoice.client?.name
            }
          </h4>

        </div>

        <div>

          <p style={styles.smallLabel}>
            Due Date
          </p>

          <p style={styles.dueDate}>
            {
              new Date(
                invoice.dueDate
              ).toLocaleDateString()
            }
          </p>

        </div>

      </div>

      {/* TOTAL */}

      <div style={styles.totalSection}>

        <p style={styles.smallLabel}>
          Total Amount
        </p>

        <h2 style={styles.total}>
          ₹{
            invoice.totalAmount
          }
        </h2>

      </div>

      {/* PAYMENT */}

      <div style={styles.paymentBox}>

        <input
          type="number"
          placeholder="Payment amount"
          value={paymentAmount}
          onChange={(e) =>
            setPaymentAmount(
              e.target.value
            )
          }
          style={styles.input}
        />

        <button
          style={styles.paymentBtn}
          onClick={recordPayment}
        >

          {
            loading
              ? "Processing..."
              : "Record Payment"
          }

        </button>

      </div>

      {/* ACTIONS */}

      <div style={styles.actions}>

        <button
          style={styles.downloadBtn}
          onClick={downloadPDF}
        >
          Download PDF
        </button>

        <button
          style={styles.shareBtn}
          onClick={copyShareLink}
        >
          Share
        </button>

      </div>

    </div>
  );
}

const styles = {

  card: {
    background: "white",
    borderRadius: "26px",
    padding: "26px",
    border:
      "1px solid #e2e8f0",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)",

    transition:
      "all 0.25s ease",

    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },

  top: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start"
  },

  label: {
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "8px"
  },

  invoiceNo: {
    fontSize: "24px",
    fontWeight: "800"
  },

  status: {
    padding: "10px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform:
      "capitalize"
  },

  clientSection: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: "20px"
  },

  smallLabel: {
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "8px"
  },

  clientName: {
    fontSize: "18px",
    fontWeight: "700"
  },

  dueDate: {
    color: "#334155",
    fontWeight: "500"
  },

  totalSection: {
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "20px"
  },

  total: {
    fontSize: "34px",
    fontWeight: "800",
    marginTop: "6px"
  },

  paymentBox: {
    display: "flex",
    gap: "12px"
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "14px",
    border:
      "1px solid #dbe3ec",
    outline: "none",
    fontSize: "14px"
  },

  paymentBtn: {
    background:
      "#4f46e5",
    color: "white",
    border: "none",
    padding: "14px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    whiteSpace: "nowrap"
  },

  actions: {
    display: "flex",
    gap: "12px"
  },

  downloadBtn: {
    flex: 1,
    background: "#111827",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700"
  },

  shareBtn: {
    background: "#eef2ff",
    color: "#4338ca",
    border: "none",
    padding: "14px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700"
  }

};

export default InvoiceCard;