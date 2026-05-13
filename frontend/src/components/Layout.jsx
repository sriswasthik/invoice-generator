import { useAuth } from "../context/AuthContext";

function Layout({ page, setPage, children }) {

  const { user, logout } = useAuth();

  return (

    <div style={styles.container}>

      {/* =========================
          SIDEBAR
      ========================== */}

      <aside style={styles.sidebar}>

        <div>

          <h2 style={styles.logo}>
            InvoiceApp
          </h2>

          <nav style={styles.nav}>

            <div
              style={{
                ...styles.navItem,
                ...(page === "dashboard"
                  ? styles.activeItem
                  : {})
              }}
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </div>

            <div
              style={{
                ...styles.navItem,
                ...(page === "clients"
                  ? styles.activeItem
                  : {})
              }}
              onClick={() => setPage("clients")}
            >
              Clients
            </div>

            <div
              style={{
                ...styles.navItem,
                ...(page === "create"
                  ? styles.activeItem
                  : {})
              }}
              onClick={() => setPage("create")}
            >
              Create Invoice
            </div>

          </nav>

        </div>

        {/* =========================
            USER SECTION
        ========================== */}

        <div style={styles.userBox}>

          <div>

            <p style={styles.userLabel}>
              Logged in as
            </p>

            <strong style={styles.userEmail}>
              {user?.email}
            </strong>

          </div>

          <button
            style={styles.logoutBtn}
            onClick={() => {

              logout();

              window.location.reload();
            }}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main style={styles.main}>

        <div style={styles.topbar}>

          <h1 style={styles.pageTitle}>
            {page === "dashboard" && "Dashboard"}
            {page === "clients" && "Clients"}
            {page === "create" && "Create Invoice"}
          </h1>

        </div>

        <div style={styles.content}>
          {children}
        </div>

      </main>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc"
  },

  sidebar: {
    width: "240px",
    background: "#0f172a",
    color: "white",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 0
  },

  logo: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "40px"
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  navItem: {
    padding: "12px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#cbd5e1",
    transition: "0.2s ease",
    fontSize: "15px",
    fontWeight: "500"
  },

  activeItem: {
    background: "#1e293b",
    color: "white"
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  topbar: {
    height: "72px",
    background: "white",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    padding: "0 30px"
  },

  pageTitle: {
    fontSize: "28px",
    fontWeight: "700"
  },

  content: {
    flex: 1,
    padding: "30px",
    width: "100%"
  },

  userBox: {
    borderTop: "1px solid #1e293b",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  userLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "6px"
  },

  userEmail: {
    color: "white",
    fontSize: "14px",
    wordBreak: "break-word"
  },

  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  }

};

export default Layout;