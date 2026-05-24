import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import api from "../api/api";

function PublicInvoice() {

  const { id } = useParams();

  const [invoice, setInvoice] =
    useState(null);

  useEffect(() => {

    fetchInvoice();

  }, []);

  const fetchInvoice = async () => {

    try {

      const res =
        await api.get(
          `/invoices/public/${id}`
        );

      setInvoice(res.data);

    } catch (error) {

      console.error(error);
    }
  };

  if (!invoice) {

    return (

      <div style={styles.loading}>
        Loading invoice...
      </div>

    );
  }

  const subtotal =
    invoice.items?.reduce(
      (sum, item) =>
        sum +
        (
          Number(item.quantity || 1) *
          Number(item.price || 0)
        ),
      0
    );

  const tax =
    invoice.items?.reduce(
      (sum, item) => {

        const total =
          Number(item.quantity || 1) *
          Number(item.price || 0);

        return (
          sum +
          (
            total *
            (
              Number(
                item.taxPercent || 0
              ) / 100
            )
          )
        );
      },
      0
    );

  const total =
    subtotal + tax;

  return (

    <div style={styles.page}>

      <div style={styles.invoiceCard}>

        {/* TOP */}

        <div style={styles.topSection}>

          <div>

            <div style={styles.logo}>
              InvoiceOS
            </div>

            <p style={styles.subText}>
              Professional Invoice
            </p>

          </div>

          <div
            style={{
              ...styles.status,
              background:
                invoice.status === "paid"
                  ? "#dcfce7"
                  : "#fee2e2",

              color:
                invoice.status === "paid"
                  ? "#166534"
                  : "#dc2626"
            }}
          >

            {invoice.status}

          </div>

        </div>

        {/* TITLE */}

        <div style={styles.header}>

          <div>

            <h1 style={styles.title}>
              Invoice
            </h1>

            <p style={styles.invoiceNo}>
              #{invoice.invoiceNumber}
            </p>

          </div>

          <div style={styles.meta}>

            <div>
              <strong>
                Issue Date
              </strong>

              <p>
                {
                  new Date(
                    invoice.issueDate
                  ).toLocaleDateString()
                }
              </p>

            </div>

            <div>

              <strong>
                Due Date
              </strong>

              <p>
                {
                  new Date(
                    invoice.dueDate
                  ).toLocaleDateString()
                }
              </p>

            </div>

          </div>

        </div>

        {/* CLIENT */}

        <div style={styles.clientCard}>

          <h3 style={styles.sectionTitle}>
            Billed To
          </h3>

          <h2 style={styles.clientName}>
            {invoice.client?.name}
          </h2>

          <p style={styles.clientInfo}>
            {invoice.client?.email}
          </p>

          <p style={styles.clientInfo}>
            {invoice.client?.phone}
          </p>

          <p style={styles.clientInfo}>
            {invoice.client?.address}
          </p>

        </div>

        {/* ITEMS */}

        <div style={styles.itemsSection}>

          <div style={styles.tableHeader}>

            <div>Description</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Total</div>

          </div>

          {invoice.items?.map(
            (item) => (

              <div
                key={item.id}
                style={styles.itemRow}
              >

                <div>
                  {
                    item.description
                  }
                </div>

                <div>
                  {item.quantity}
                </div>

                <div>
                  ₹{item.price}
                </div>

                <div>
                  ₹{
                    item.quantity *
                    item.price
                  }
                </div>

              </div>

            )
          )}

        </div>

        {/* TOTALS */}

        <div style={styles.totalSection}>

          <div style={styles.totalCard}>

            <div style={styles.totalRow}>

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>

            </div>

            <div style={styles.totalRow}>

              <span>
                Tax
              </span>

              <strong>
                ₹{tax}
              </strong>

            </div>

            <div style={styles.divider} />

            <div style={styles.finalRow}>

              <span>
                Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div style={styles.footer}>

          Thank you for your business.

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#eef2ff",
    padding: "50px 20px",
    display: "flex",
    justifyContent: "center"
  },

  invoiceCard: {
    width: "100%",
    maxWidth: "960px",
    background: "white",
    borderRadius: "32px",
    padding: "50px",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.08)"
  },

  topSection: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "40px"
  },

  logo: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#4f46e5"
  },

  subText: {
    color: "#64748b",
    marginTop: "6px"
  },

  status: {
    padding: "10px 18px",
    borderRadius: "999px",
    fontWeight: "700",
    textTransform: "capitalize"
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    marginBottom: "40px"
  },

  title: {
    fontSize: "52px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  invoiceNo: {
    color: "#64748b",
    fontSize: "16px"
  },

  meta: {
    display: "flex",
    gap: "40px",
    color: "#334155"
  },

  clientCard: {
    background: "#f8fafc",
    borderRadius: "24px",
    padding: "28px",
    marginBottom: "40px"
  },

  sectionTitle: {
    color: "#64748b",
    marginBottom: "14px"
  },

  clientName: {
    marginBottom: "10px"
  },

  clientInfo: {
    color: "#475569",
    marginBottom: "6px"
  },

  itemsSection: {
    marginBottom: "40px"
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr 1fr 1fr",
    padding: "16px 20px",
    background: "#f1f5f9",
    borderRadius: "16px",
    fontWeight: "700",
    marginBottom: "12px"
  },

  itemRow: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr 1fr 1fr",
    padding: "18px 20px",
    borderBottom:
      "1px solid #e2e8f0",
    alignItems: "center"
  },

  totalSection: {
    display: "flex",
    justifyContent: "flex-end"
  },

  totalCard: {
    width: "360px",
    background: "#f8fafc",
    borderRadius: "24px",
    padding: "28px"
  },

  totalRow: {
    display: "flex",
    justifyContent:
      "space-between",
    marginBottom: "18px",
    color: "#475569"
  },

  divider: {
    height: "1px",
    background: "#dbe3ec",
    margin: "20px 0"
  },

  finalRow: {
    display: "flex",
    justifyContent:
      "space-between",
    fontSize: "28px",
    fontWeight: "800"
  },

  footer: {
    marginTop: "50px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "15px"
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px"
  }

};

export default PublicInvoice;