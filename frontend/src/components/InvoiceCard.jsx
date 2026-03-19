import api from "../api/api";
import { useState } from "react";

function InvoiceCard({ invoice }) {

  const [paymentAmount, setPaymentAmount] = useState("");

  const downloadPDF = () => {
    window.open(
      `http://localhost:5000/api/invoices/${invoice.id}/pdf`,
      "_blank"
    );
  };

  const recordPayment = async () => {

  console.log("Sending:", invoice.id, paymentAmount);

  try {
    const res = await api.post("/payments", {
      invoiceId: invoice.id,
      amount: Number(paymentAmount),
      method: "manual"
    });

    console.log("Response:", res.data);

    alert("Payment recorded");

  } catch (err) {
    console.error("ERROR:", err);
    alert("Payment failed");
  }
};

  const getStatusColor = () => {
    switch (invoice.status) {
      case "paid":
        return "green";
      case "partial":
        return "orange";
      case "draft":
        return "gray";
      default:
        return "black";
    }
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-4px)";
  e.currentTarget.style.zIndex = "1";   // ADD THIS
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.zIndex = "0";
}}
    >

      <div style={styles.header}>
        <h3>{invoice.invoiceNumber}</h3>
        <span style={{
          padding: "4px 10px",
          borderRadius: "6px",
          background: invoice.status === "paid"
            ? "#dcfce7"
            : invoice.status === "partial"
              ? "#fef3c7"
              : "#e5e7eb"
        }}>
          {invoice.status}
        </span>
      </div>

      <p><strong>Client:</strong> {invoice.client.name}</p>
      <p><strong>Total:</strong> ₹{invoice.totalAmount}</p>
      <p><strong>Due:</strong> {new Date(invoice.dueDate).toDateString()}</p>

      <button onClick={downloadPDF} style={styles.button}>
        Download PDF
      </button>

      {/* Payment UI */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          placeholder="Payment Amount"
          onChange={(e) => {
  console.log("typing:", e.target.value);
  setPaymentAmount(e.target.value);
}}
        />
        

        <button onClick={recordPayment}>
          Record Payment
        </button>
      </div>

    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    cursor: "pointer"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px"
  },

  status: {
    fontWeight: "bold"
  },

  button: {
    marginTop: "10px",
    padding: "8px 12px",
    cursor: "pointer"
  }

  
};

export default InvoiceCard;