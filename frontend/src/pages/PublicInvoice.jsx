import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

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

      const res = await api.get(
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

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Invoice
        </h1>

        <div style={styles.section}>

          <p>
            <strong>
              Invoice Number:
            </strong>
            {" "}
            {invoice.invoiceNumber}
          </p>

          <p>
            <strong>
              Client:
            </strong>
            {" "}
            {invoice.client?.name}
          </p>

          <p>
            <strong>
              Status:
            </strong>
            {" "}
            {invoice.status}
          </p>

          <p>
            <strong>
              Total:
            </strong>
            {" "}
            ₹{invoice.totalAmount}
          </p>

        </div>

        <h3 style={styles.itemsTitle}>
          Items
        </h3>

        <div style={styles.items}>

          {invoice.items?.map((item) => (

            <div
              key={item.id}
              style={styles.item}
            >

              <span>
                {item.description}
              </span>

              <strong>
                ₹{item.amount}
              </strong>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px"
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "white",
    borderRadius: "20px",
    padding: "40px",
    border: "1px solid #e2e8f0"
  },

  title: {
    marginBottom: "30px"
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px"
  },

  itemsTitle: {
    marginBottom: "16px"
  },

  items: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px",
    background: "#f8fafc",
    borderRadius: "10px"
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

};

export default PublicInvoice;