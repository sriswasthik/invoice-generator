import { useEffect, useState } from "react";

import api from "../api/api";

import InvoiceCard from "../components/InvoiceCard";

import AnalyticsChart from "../components/AnalyticsChart";

function Dashboard() {

  const [invoices, setInvoices] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("all");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices =
    async () => {

      try {

        const res =
          await api.get("/invoices");

        setInvoices(res.data);

      } catch (error) {

        console.error(error);
      }
    };

  // =========================
  // ANALYTICS
  // =========================

  const totalRevenue =
    invoices.reduce(
      (sum, inv) =>
        sum +
        (inv.totalAmount || 0),
      0
    );

  const paidInvoices =
    invoices.filter(
      (inv) =>
        inv.status === "paid"
    );

  const pendingInvoices =
    invoices.filter(
      (inv) =>
        inv.status !== "paid"
    );

  const totalPaid =
    paidInvoices.reduce(
      (sum, inv) =>
        sum +
        (inv.totalAmount || 0),
      0
    );

  const totalPending =
    pendingInvoices.reduce(
      (sum, inv) =>
        sum +
        (inv.totalAmount || 0),
      0
    );

  // =========================
  // FILTERS
  // =========================

  const filteredInvoices =
    invoices.filter((inv) => {

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
    });

  return (

    <div style={styles.page}>

      {/* HERO */}

      <div style={styles.hero}>

        <div>

          <p style={styles.welcome}>
            Welcome Back 👋
          </p>

          <h1 style={styles.heading}>
            Financial Dashboard
          </h1>

          <p style={styles.heroText}>
            Monitor invoices,
            revenue and payments
            in one place.
          </p>

        </div>

        <div style={styles.heroBadge}>

          <div
            style={styles.badgeDot}
          />

          Active Business

        </div>

      </div>

      {/* STATS */}

      <div style={styles.statsGrid}>

        <div style={styles.primaryCard}>

          <p style={styles.cardLabel}>
            Total Revenue
          </p>

          <h2 style={styles.bigAmount}>
            ₹{totalRevenue}
          </h2>

          <p style={styles.cardSub}>
            Across all invoices
          </p>

        </div>

        <div style={styles.statCard}>

          <p style={styles.cardLabel}>
            Paid Revenue
          </p>

          <h2 style={styles.amount}>
            ₹{totalPaid}
          </h2>

        </div>

        <div style={styles.statCard}>

          <p style={styles.cardLabel}>
            Pending Revenue
          </p>

          <h2 style={styles.amount}>
            ₹{totalPending}
          </h2>

        </div>

        <div style={styles.statCard}>

          <p style={styles.cardLabel}>
            Total Invoices
          </p>

          <h2 style={styles.amount}>
            {invoices.length}
          </h2>

        </div>

      </div>

      {/* INSIGHTS */}

      <div style={styles.insightGrid}>

        <div style={styles.insightCard}>

          <div>

            <p style={styles.cardLabel}>
              Collection Rate
            </p>

            <h2 style={styles.insightNumber}>

              {
                invoices.length

                  ? Math.round(
                    (
                      paidInvoices.length /
                      invoices.length
                    ) * 100
                  )

                  : 0
              }%

            </h2>

          </div>

          <div style={styles.iconBox}>
            📈
          </div>

        </div>

        <div style={styles.insightCard}>

          <div>

            <p style={styles.cardLabel}>
              Pending Invoices
            </p>

            <h2 style={styles.insightNumber}>
              {pendingInvoices.length}
            </h2>

          </div>

          <div style={styles.iconBox}>
            ⏳
          </div>

        </div>

      </div>

      {/* CHART */}

      <div style={styles.chartCard}>

        <div style={styles.chartHeader}>

          <div>

            <h2>
              Revenue Analytics
            </h2>

            <p style={styles.chartSub}>
              Invoice revenue overview
            </p>

          </div>

        </div>

        <AnalyticsChart
          invoices={invoices}
        />

      </div>

      {/* FILTERS */}

      <div style={styles.toolbar}>

        <input
          placeholder="Search invoices or clients..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
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
            All Status
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

      {/* RECENT */}

      <div style={styles.sectionHeader}>

        <div>

          <h2>
            Recent Invoices
          </h2>

          <p style={styles.sectionSub}>
            Latest invoice activity
          </p>

        </div>

        <div style={styles.countBadge}>
          {filteredInvoices.length}
          {" "}Invoices
        </div>

      </div>

      {filteredInvoices.length === 0 ? (

        <div style={styles.emptyState}>

          <h3>
            No Invoices Found
          </h3>

          <p>
            Create invoices to start
            tracking revenue.
          </p>

        </div>

      ) : (

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

      )}

    </div>
  );
}

const styles = {

  page: {
    width: "100%"
  },

  hero: {
    background:
      "linear-gradient(135deg, #4c0505, #7650a7)",
    borderRadius: "28px",
    padding: "36px",
    color: "white",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "30px",
    boxShadow:
      "0 10px 40px rgba(79,70,229,0.25)"
  },

  welcome: {
    opacity: 0.9,
    marginBottom: "10px"
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  heroText: {
    opacity: 0.9,
    maxWidth: "500px",
    lineHeight: 1.6
  },

  heroBadge: {
    background:
      "rgba(255,255,255,0.18)",
    padding: "12px 18px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600"
  },

  badgeDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#22c55e"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "2fr 1fr 1fr 1fr",
    gap: "20px",
    marginBottom: "24px"
  },

  primaryCard: {
    background: "#111827",
    color: "white",
    borderRadius: "24px",
    padding: "28px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)"
  },

  statCard: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 8px 24px rgba(0,0,0,0.04)"
  },

  cardLabel: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "12px"
  },

  bigAmount: {
    fontSize: "40px",
    fontWeight: "800"
  },

  amount: {
    fontSize: "30px",
    fontWeight: "700"
  },

  cardSub: {
    marginTop: "12px",
    color: "#cbd5e1"
  },

  insightGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "20px",
    marginBottom: "28px"
  },

  insightCard: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    border: "1px solid #e2e8f0",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    boxShadow:
      "0 8px 24px rgba(0,0,0,0.04)"
  },

  insightNumber: {
    fontSize: "42px",
    fontWeight: "800"
  },

  iconBox: {
    fontSize: "42px"
  },

  chartCard: {
    background: "white",
    borderRadius: "28px",
    padding: "30px",
    border: "1px solid #e2e8f0",
    marginBottom: "30px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.04)"
  },

  chartHeader: {
    marginBottom: "20px"
  },

  chartSub: {
    color: "#64748b",
    marginTop: "6px"
  },

  toolbar: {
    display: "flex",
    gap: "16px",
    marginBottom: "28px",
    flexWrap: "wrap"
  },

  search: {
    flex: 1,
    minWidth: "260px",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #dbe3ec",
    background: "white",
    outline: "none",
    fontSize: "15px"
  },

  filter: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #dbe3ec",
    background: "white",
    minWidth: "180px",
    outline: "none",
    fontSize: "15px"
  },

  sectionHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },

  sectionSub: {
    color: "#64748b",
    marginTop: "6px"
  },

  countBadge: {
    background: "#eef2ff",
    color: "#4338ca",
    padding: "10px 16px",
    borderRadius: "12px",
    fontWeight: "600"
  },

  invoiceGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "24px"
  },

  emptyState: {
    background: "white",
    borderRadius: "28px",
    padding: "60px",
    textAlign: "center",
    border: "1px solid #e2e8f0",
    color: "#64748b"
  }

};

export default Dashboard;