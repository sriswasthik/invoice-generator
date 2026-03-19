function Layout({ page, setPage, children }) {

  return (
    <div style={styles.container}>

      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>InvoiceApp</h2>

        <nav style={styles.nav}>

          <div
            style={{
              ...styles.navItem,
              ...(page === "dashboard" && styles.activeItem)
            }}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </div>

          <div
            style={{
              ...styles.navItem,
              ...(page === "clients" && styles.activeItem)
            }}
            onClick={() => setPage("clients")}
          >
            Clients
          </div>

          <div
            style={{
              ...styles.navItem,
              ...(page === "create" && styles.activeItem)
            }}
            onClick={() => setPage("create")}
          >
            Create Invoice
          </div>

        </nav>
      </aside>

      <main style={styles.main}>

        <div style={styles.topbar}>
          <h1>Dashboard</h1>
        </div>

        <div style={styles.content}>
  <div key={page} style={styles.page}>
    {children}
  </div>
</div>

      </main>

    </div>
  );
}



const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%"
  },

  sidebar: {
    width: "230px",
    background: "#0f172a",
    color: "white",
    padding: "24px",
    flexShrink: 0,
    minHeight: "100vh"   // IMPORTANT (prevents shrinking)
  },

  main: {
    flex: 1,
    background: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },

  topbar: {
    height: "70px",
    background: "white",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    padding: "0 30px"
  },

  content: {
  padding: "30px 20px",
  width: "100%",
  maxWidth: "100%",   // IMPORTANT
},

  nav: {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
},

navItem: {
  padding: "10px 12px",
  borderRadius: "6px",
  color: "#cbd5f5",
  cursor: "pointer",
  fontSize: "14px"
},

activeItem: {
  background: "#1e293b",
  color: "white",
  fontWeight: "500"
},

page: {
  animation: "fadeIn 0.3s ease"
},



};
export default Layout;