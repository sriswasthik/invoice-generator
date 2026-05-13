import { useEffect, useState } from "react";

import api from "../api/api";

import InvoiceCard from "../components/InvoiceCard";

import AnalyticsChart from "../components/AnalyticsChart";

function Dashboard() {

  const [invoices, setInvoices] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {

    try {

      const res = await api.get("/invoices");

      setInvoices(res.data);

    } catch (error) {

      console.error(error);
    }
  };

  // =========================
  // ANALYTICS
  // =========================

  const totalRevenue = invoices.reduce(
    (sum, inv) =>
      sum + (inv.totalAmount || 0),
    0
  );

  const paidInvoices = invoices.filter(
    (inv) => inv.status === "paid"
  );

  const pendingInvoices = invoices.filter(
    (inv) => inv.status !== "paid"
  );

  const totalPaid = paidInvoices.reduce(
    (sum, inv) =>
      sum + (inv.totalAmount || 0),
    0
  );

  const totalPending =
    pendingInvoices.reduce(
      (sum, inv) =>
        sum + (inv.totalAmount || 0),
      0
    );

  // =========================
  // FILTERS
  // =========================

  const filteredInvoices = invoices.filter(
    (inv) => {

      const matchesSearch =
        inv.invoiceNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        inv.client?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all" ||
        inv.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  return (

    <div style={styles.wrapper}>

      {/* HEADER */}

      <div style={styles.header}>

        <div>

          <h2>Dashboard</h2>

          <p style={styles.subtext}>
            Overview of your invoices
            and payments
          </p>

        </div>

      </div>

      {/* STATS */}

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>
            Total Revenue
          </p>

          <h2>
            ₹{totalRevenue}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>
            Paid Revenue
          </p>

          <h2>
            ₹{totalPaid}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>
            Pending Revenue
          </p>

          <h2>
            ₹{totalPending}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>
            Invoices
          </p>

          <h2>
            {invoices.length}
          </h2>
        </div>

      </div>

      {/* INSIGHTS */}

      <div style={styles.insights}>

        <div style={styles.insightCard}>

          <h3>Collection Rate</h3>

          <p style={styles.bigText}>

            {
              invoices.length
                ? Math.round(
                  (paidInvoices.length /
                    invoices.length) * 100
                )
                : 0
            }%

          </p>

        </div>

        <div style={styles.insightCard}>

          <h3>Pending Invoices</h3>

          <p style={styles.bigText}>
            {pendingInvoices.length}
          </p>

        </div>

      </div>

      <AnalyticsChart invoices={invoices} />

      {/* FILTERS */}

      <div style={styles.toolbar}>

        <input
          placeholder="Search invoices or clients..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.search}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          style={styles.filter}
        >

          <option value="all">
            All
          </option>

          <option value="paid">
            Paid
          </option>

          <option value="partial">
            Partial
          </option>

          <option value="draft">
            Draft
          </option>

        </select>

      </div>

      {/* INVOICE SECTION */}

      <div style={styles.sectionHeader}>

        <h3>Recent Invoices</h3>

        <span style={styles.count}>
          {filteredInvoices.length}
          {" "}items
        </span>

      </div>

      {filteredInvoices.length === 0 && (

        <p style={{ color: "#64748b" }}>
          No invoices found
        </p>

      )}

      <div style={styles.invoiceGrid}>

        {filteredInvoices.map(
          (invoice) => (

            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
            />

          )
        )}

      </div>

    </div>
  );
}

const styles = {

  wrapper: {
    width: "100%"
  },

  header: {
    marginBottom: "30px"
  },

  subtext: {
    color: "#64748b",
    marginTop: "6px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  statCard: {
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 4px 14px rgba(0,0,0,0.04)"
  },

  statLabel: {
    color: "#64748b",
    marginBottom: "10px",
    fontSize: "14px"
  },

  insights: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  insightCard: {
    background: "white",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid #e2e8f0"
  },

  bigText: {
    fontSize: "42px",
    fontWeight: "700",
    marginTop: "10px"
  },

  toolbar: {
    display: "flex",
    gap: "14px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },

  search: {
    flex: 1,
    minWidth: "240px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "white"
  },

  filter: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "white"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  count: {
    color: "#64748b",
    fontSize: "14px"
  },

  invoiceGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "24px",
    width: "100%"
  }

};

export default Dashboard;