import { useEffect, useState } from "react";
import api from "../api/api";
import InvoiceCard from "../components/InvoiceCard";
import StatCard from "../components/StatCard";

function Dashboard() {

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await api.get("/invoices/1");
    setInvoices(res.data);
  };

//   return (
//     <div>
//       <h2>Invoices</h2>

//       {invoices.map((invoice) => (
//         <div key={invoice.id}>
//           <strong>{invoice.invoiceNumber}</strong>
//           <p>{invoice.client.name}</p>
//           <p>Status: {invoice.status}</p>
//           <p>Total: ₹{invoice.totalAmount}</p>
//         </div>
//       ))}
//     </div>
//   );
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const calculateStats = () => {

  let revenue = 0;
  let paid = 0;
  let pending = 0;

  invoices.forEach(inv => {

    if (inv.status === "paid") {
      revenue += inv.totalAmount;
      paid++;
    } else {
      pending++;
    }

  });

  return {
    revenue,
    total: invoices.length,
    paid,
    pending
  };
};

<div style={styles.toolbar}>

  <input
    placeholder="Search invoices or clients..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={styles.search}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={styles.filter}
  >
    <option value="all">All</option>
    <option value="paid">Paid</option>
    <option value="partial">Partial</option>
    <option value="draft">Draft</option>
  </select>

</div>

const stats = calculateStats();
const filteredInvoices = invoices.filter((inv) => {

  const matchesSearch =
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
    inv.client.name.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || inv.status === statusFilter;

  return matchesSearch && matchesStatus;
});


return (

  

  <div style={{ maxWidth: "100%" }}>


   <div style={styles.wrapper}>

    {/* HEADER */}
    <div style={styles.header}>
      <div>
        <h2>Dashboard</h2>
        <p style={styles.subtext}>
          Overview of your invoices and payments
        </p>
      </div>
    </div>
      

  <div style={styles.statsGrid}>
      <StatCard title="Revenue" value={`₹${stats.revenue}`} />
      <StatCard title="Invoices" value={stats.total} />
      <StatCard title="Paid" value={stats.paid} />
      <StatCard title="Pending" value={stats.pending} />
    </div>

    <div style={styles.section}>

      <div style={styles.sectionHeader}>
        <h3>Recent Invoices</h3>
        <span style={styles.count}>
          {filteredInvoices.length} items
        </span>
      </div>

      {filteredInvoices.length === 0 && (
        <p style={{ color: "#64748b" }}>
          No invoices found
        </p>
      )}

      <div style={styles.grid}>
        {filteredInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>

    </div>

</div>

    <h2>Invoices</h2>

    {invoices.length === 0 && <p>No invoices found</p>}
<p style={{ color: "#64748b", marginBottom: "10px" }}>
  Showing {filteredInvoices.length} invoices
</p>
    <div style={styles.grid}>
  {filteredInvoices.map((invoice) => (
    <InvoiceCard key={invoice.id} invoice={invoice} />
  ))}
  {filteredInvoices.length === 0 && (
  <p style={{ color: "#64748b" }}>
    No invoices found. Try adjusting filters.
  </p>
)}
</div>

  </div>
);
}

// const styles = {

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//     gap: "20px"
//   }

// };

const styles = {

  card: {
  width: "100%",
  background: "white",
  borderRadius: "12px",
  padding: "16px",   // was 20
  border: "1px solid #e2e8f0"
},

  toolbar: {
  display: "flex",
  gap: "12px",
  marginBottom: "20px",
  alignItems: "center"
},

search: {
  flex: 1,
  maxWidth: "320px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  background: "white"
},

filter: {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  background: "white"
},

  statsGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px"
},

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0"
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  width: "100%"
},

   wrapper: {
    width: "100%",
  },

  header: {
    marginBottom: "25px"
  },

  subtext: {
    color: "#64748b",
    marginTop: "4px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  section: {
    marginTop: "20px"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  count: {
    fontSize: "13px",
    color: "#64748b"
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
  width: "100%"
}

  
};

export default Dashboard;