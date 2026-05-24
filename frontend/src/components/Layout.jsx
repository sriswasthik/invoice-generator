import { useAuth }
from "../context/AuthContext";

import {
  useTheme
} from "../context/ThemeContext";

function Layout({
  page,
  setPage,
  children
}) {

  const {
    darkMode,
    toggleTheme
  } = useTheme();

  const {
    user,
    logout
  } = useAuth();

  const navItems = [

    {
      key: "dashboard",
      label: "Dashboard",
      // icon: "📊"
    },

    {
      key: "clients",
      label: "Clients",
      // icon: "👥"
    },

    {
      key: "create",
      label: "Create Invoice",
      // icon: "🧾"
    }

  ];

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}

      <aside style={styles.sidebar}>

        <div>

          {/* LOGO */}

          <div style={styles.logoSection}>

            <div style={styles.logoIcon}>
              I
            </div>

            <div>

              <h2 style={styles.logo}>
                InvoiceOS
              </h2>

              <p style={styles.logoSub}>
                Business Suite
              </p>

            </div>

          </div>

          {/* NAVIGATION */}

          <div style={styles.navGroup}>

            <p style={styles.navTitle}>
              MENU
            </p>

            <nav style={styles.nav}>

              {navItems.map(
                (item) => (

                  <div
                    key={item.key}

                    style={{
                      ...styles.navItem,

                      ...(page === item.key
                        ? styles.activeItem
                        : {})
                    }}

                    onClick={() =>
                      setPage(item.key)
                    }
                  >

                    <span style={styles.navIcon}>
                      {item.icon}
                    </span>

                    {item.label}

                  </div>

                )
              )}

            </nav>

          </div>

        </div>

        {/* BOTTOM */}

        <div>

          {/* THEME */}

          <button
            style={styles.themeBtn}
            onClick={toggleTheme}
          >

            <span>
              {
                darkMode
                  // ? "☀"
                  // : "🌙"
              }
            </span>

            {
              darkMode
                ? "Light Mode"
                : "Dark Mode"
            }

          </button>

          {/* USER */}

          <div style={styles.userBox}>

            <div style={styles.avatar}>
              {
                user?.email
                  ?.charAt(0)
                  ?.toUpperCase()
              }
            </div>

            <div style={styles.userInfo}>

              <p style={styles.userLabel}>
                Logged in as
              </p>

              <strong style={styles.userEmail}>
                {user?.email}
              </strong>

            </div>

          </div>

          {/* LOGOUT */}

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

      {/* MAIN */}

      <main style={styles.main}>

        {/* TOPBAR */}

        <div style={styles.topbar}>

          <div>

            <h1 style={styles.pageTitle}>

              {
                page === "dashboard" &&
                "Dashboard"
              }

              {
                page === "clients" &&
                "Clients"
              }

              {
                page === "create" &&
                "Create Invoice"
              }

            </h1>

            <p style={styles.pageSub}>

              {
                page === "dashboard" &&
                "Monitor your business analytics"
              }

              {
                page === "clients" &&
                "Manage your client base"
              }

              {
                page === "create" &&
                "Generate professional invoices"
              }

            </p>

          </div>

          <div style={styles.topbarRight}>

            <div style={styles.statusBadge}>

              <div style={styles.statusDot} />

              Live

            </div>

          </div>

        </div>

        {/* CONTENT */}

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

  // ======================
  // SIDEBAR
  // ======================

  sidebar: {
    width: "280px",

    background: "#0f172a",

    color: "white",

    padding: "28px 22px",

    display: "flex",

    flexDirection: "column",

    justifyContent:
      "space-between",

    borderRight:
      "1px solid #1e293b"
  },

  logoSection: {
    display: "flex",

    alignItems: "center",

    gap: "14px",

    marginBottom: "50px"
  },

  logoIcon: {
    width: "48px",

    height: "48px",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg, #890054, #762900)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontWeight: "800",

    fontSize: "20px"
  },

  logo: {
    fontSize: "24px",

    fontWeight: "800"
  },

  logoSub: {
    color: "#94a3b8",

    fontSize: "13px",

    marginTop: "4px"
  },

  navGroup: {
    marginTop: "20px"
  },

  navTitle: {
    color: "#64748b",

    fontSize: "12px",

    letterSpacing: "1px",

    marginBottom: "16px"
  },

  nav: {
    display: "flex",

    flexDirection: "column",

    gap: "8px"
  },

  navItem: {
    display: "flex",

    alignItems: "center",

    gap: "14px",

    padding: "14px 16px",

    borderRadius: "16px",

    cursor: "pointer",

    color: "#cbd5e1",

    transition: "all 0.2s ease",

    fontWeight: "500"
  },

  activeItem: {
    background:
      "linear-gradient(135deg, #890054, #762900)",

    color: "white",

    boxShadow:
      "0 10px 25px rgba(79,70,229,0.35)"
  },

  navIcon: {
    fontSize: "18px"
  },

  // ======================
  // USER
  // ======================

  themeBtn: {
    width: "100%",

    background: "#111827",

    border:
      "1px solid #1e293b",

    color: "white",

    padding: "14px 16px",

    borderRadius: "16px",

    cursor: "pointer",

    fontWeight: "600",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "10px",

    marginBottom: "18px"
  },

  userBox: {
    background: "#111827",

    border:
      "1px solid #1e293b",

    borderRadius: "18px",

    padding: "18px",

    display: "flex",

    alignItems: "center",

    gap: "14px",

    marginBottom: "16px"
  },

  avatar: {
    width: "48px",

    height: "48px",

    borderRadius: "50%",

    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontWeight: "800"
  },

  userInfo: {
    flex: 1
  },

  userLabel: {
    color: "#94a3b8",

    fontSize: "12px",

    marginBottom: "4px"
  },

  userEmail: {
    fontSize: "14px",

    wordBreak: "break-word"
  },

  logoutBtn: {
    width: "100%",

    background: "#000000",

    color: "white",

    border: "none",

    padding: "14px",

    borderRadius: "16px",

    cursor: "pointer",

    fontWeight: "700"
  },

  // ======================
  // MAIN
  // ======================

  main: {
    flex: 1,

    display: "flex",

    flexDirection: "column"
  },

  topbar: {
    height: "90px",

    background:
      "rgba(255,255,255,0.75)",

    backdropFilter: "blur(12px)",

    borderBottom:
      "1px solid #e2e8f0",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    padding: "0 36px",

    position: "sticky",

    top: 0,

    zIndex: 100
  },

  pageTitle: {
    fontSize: "30px",

    fontWeight: "800",

    marginBottom: "6px"
  },

  pageSub: {
    color: "#64748b"
  },

  topbarRight: {
    display: "flex",

    alignItems: "center",

    gap: "16px"
  },

  statusBadge: {
    background: "#dcfce7",

    color: "#166534",

    padding: "10px 16px",

    borderRadius: "999px",

    display: "flex",

    alignItems: "center",

    gap: "10px",

    fontWeight: "700"
  },

  statusDot: {
    width: "10px",

    height: "10px",

    borderRadius: "50%",

    background: "#22c55e"
  },

  content: {
    flex: 1,

    padding: "32px"
  }

};

export default Layout;