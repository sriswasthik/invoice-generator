import { useEffect, useState } from "react";
import api from "../api/api";

function Clients() {

  const [clients, setClients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: ""
    });

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

    } finally {

      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const createClient = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/clients",
        form
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        address: ""
      });

      fetchClients();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create client"
      );
    }
  };

  const deleteClient = async (id) => {

    try {

      await api.delete(
        `/clients/${id}`
      );

      fetchClients();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete client"
      );
    }
  };

  return (

    <div style={styles.page}>

      {/* LEFT PANEL */}

      <div style={styles.formSection}>

        <div style={styles.formCard}>

          <div style={styles.formHeader}>

            <h2 style={styles.title}>
              Add New Client
            </h2>

            <p style={styles.subtitle}>
              Store and manage your
              client information
            </p>

          </div>

          <form
            onSubmit={createClient}
            style={styles.form}
          >

            <input
              name="name"
              placeholder="Client Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
            />

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              style={styles.textarea}
            />

            <button
              type="submit"
              style={styles.addBtn}
            >
              Add Client
            </button>

          </form>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div style={styles.clientsSection}>

        <div style={styles.sectionHeader}>

          <div>

            <h2 style={styles.title}>
              Your Clients
            </h2>

            <p style={styles.subtitle}>
              Manage your client base
            </p>

          </div>

          <div style={styles.clientCount}>
            {clients.length} Clients
          </div>

        </div>

        {loading ? (

          <div style={styles.emptyState}>
            Loading clients...
          </div>

        ) : clients.length === 0 ? (

          <div style={styles.emptyState}>

            <h3>
              No Clients Yet
            </h3>

            <p>
              Add your first client to
              start generating invoices.
            </p>

          </div>

        ) : (

          <div style={styles.grid}>

            {clients.map((client) => (

              <div
                key={client.id}
                style={styles.card}
              >

                <div style={styles.cardTop}>

                  <div>

                    <h3 style={styles.clientName}>
                      {client.name}
                    </h3>

                    <p style={styles.clientEmail}>
                      {client.email ||
                        "No email"}
                    </p>

                  </div>

                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      deleteClient(
                        client.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

                <div style={styles.clientInfo}>

                  <div>
                    📞 {client.phone ||
                      "No phone"}
                  </div>

                  <div>
                    📍 {client.address ||
                      "No address"}
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

const styles = {

  page: {
    display: "grid",
    gridTemplateColumns:
      "380px 1fr",
    gap: "28px",
    alignItems: "start"
  },

  formSection: {
    position: "sticky",
    top: "20px"
  },

  formCard: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.05)"
  },

  formHeader: {
    marginBottom: "24px"
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "6px"
  },

  subtitle: {
    color: "#64748b",
    fontSize: "15px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbe3ec",
    outline: "none",
    fontSize: "15px"
  },

  textarea: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #dbe3ec",
    minHeight: "90px",
    resize: "none",
    outline: "none",
    fontSize: "15px"
  },

  addBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "0.2s"
  },

  clientsSection: {
    width: "100%"
  },

  sectionHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },

  clientCount: {
    background: "#eef2ff",
    color: "#4338ca",
    padding: "10px 14px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "14px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    borderRadius: "22px",
    padding: "22px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 8px 24px rgba(0,0,0,0.04)",
    transition: "all 0.25s ease"
  },

  cardTop: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    marginBottom: "18px"
  },

  clientName: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "6px"
  },

  clientEmail: {
    color: "#64748b",
    fontSize: "14px"
  },

  clientInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "#334155",
    fontSize: "14px"
  },

  deleteBtn: {
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px"
  },

  emptyState: {
    background: "white",
    borderRadius: "24px",
    padding: "60px 30px",
    textAlign: "center",
    border: "1px solid #e2e8f0",
    color: "#64748b"
  }

};

export default Clients;