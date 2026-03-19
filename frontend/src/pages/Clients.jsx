import { useEffect, useState } from "react";
import api from "../api/api";

function Clients() {
  // const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const userId = 1;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await api.get(`/clients/${userId}`);
    setClients(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createClient = async (e) => {
    e.preventDefault();

    await api.post("/clients", {
      ...form,
      userId
    });

    setForm({
      name: "",
      email: "",
      phone: "",
      address: ""
    });

    fetchClients();
  };

  const deleteClient = async (id) => {
    await api.delete(`/clients/${id}`);
    fetchClients();
  };

  return (
    <div style={styles.formCard}>

      <h2>Clients</h2>

      <form onSubmit={createClient} style={styles.form}>
        <input name="name" placeholder="Client Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

        <button type="submit">Add Client</button>
      </form>

      <h3 style={{ marginTop: "20px" }}>Your Clients</h3>

      <div style={styles.grid}>
        {clients.map(client => (
          <div key={client.id} style={styles.card}>

            <div style={styles.cardHeader}>
              <strong>{client.name}</strong>

              <button
                style={styles.deleteBtn}
                onClick={() => setSelectedClient(client)}
              >
                Delete
              </button>
            </div>

            <p>{client.email}</p>
            <p>{client.phone}</p>

          </div>
        ))}
      </div>

    </div>
  );
}

// {selectedClient && (
//   <div style={styles.modalOverlay}>

//     <div style={styles.modal}>
//       <h3>Delete Client</h3>
//       <p>
//         Are you sure you want to delete{" "}
//         <strong>{selectedClient.name}</strong>?
//       </p>

//       <div style={{ display: "flex", gap: "10px" }}>
//         <button
//           style={{ background: "#ef4444" }}
//           onClick={async () => {
//             await api.delete(`/clients/${selectedClient.id}`);
//             setSelectedClient(null);
//             fetchClients();
//           }}
//         >
//           Delete
//         </button>

//         <button onClick={() => setSelectedClient(null)}>
//           Cancel
//         </button>
//       </div>

//     </div>

//   </div>
// )}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    marginBottom: "30px"
  },

  clientCard: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px"
  },

  card: {
    background: "white",
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0"
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "5px 8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px"
  },
  formCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    marginBottom: "20px",
    maxWidth: "400px"
  },

  modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
},

modal: {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "300px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
},
};

export default Clients;