import { useState }
from "react";

import api from "../api/api";

function Signup({
  setAuthPage
}) {

  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const signup = async () => {

    try {

      setLoading(true);

      await api.post(
        "/auth/signup",
        form
      );

      alert(
        "Account created successfully"
      );

      setAuthPage("login");

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.page}>

      {/* LEFT SIDE */}

      <div style={styles.left}>

        <div style={styles.overlay} />

        <div style={styles.leftContent}>

          <div style={styles.logo}>
            InvoiceOS
          </div>

          <h1 style={styles.heroTitle}>
            Start managing your business smarter.
          </h1>

          <p style={styles.heroText}>
            Create invoices, track
            revenue and manage
            clients from one modern
            dashboard.
          </p>

          <div style={styles.features}>

            <div style={styles.feature}>
              Fast Invoice Creation
            </div>

            <div style={styles.feature}>
              Revenue Analytics
            </div>

            <div style={styles.feature}>
              Secure Cloud Access
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div style={styles.right}>

        <div style={styles.card}>

          <div style={styles.cardHeader}>

            <h2 style={styles.title}>
              Create Account
            </h2>

            <p style={styles.subtitle}>
              Join InvoiceOS and
              streamline your invoicing workflow
            </p>

          </div>

          <div style={styles.form}>

            <div>

              <label style={styles.label}>
                Email Address
              </label>

              <input
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                style={styles.input}
              />

            </div>

            <div>

              <label style={styles.label}>
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Create password"
                onChange={handleChange}
                style={styles.input}
              />

            </div>

            <button
              style={styles.button}
              onClick={signup}
            >

              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }

            </button>

            <div style={styles.footer}>

              <span>
                Already have an account?
              </span>

              <span
                style={styles.link}
                onClick={() =>
                  setAuthPage(
                    "login"
                  )
                }
              >
                Login
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    display: "grid",
    gridTemplateColumns:
      "1.1fr 0.9fr",
    minHeight: "100vh",
    background: "#f8fafc"
  },

  // ======================
  // LEFT
  // ======================

  left: {
    position: "relative",
    background:
      "linear-gradient(135deg, #000000, #fbf8ff)",
    color: "white",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    padding: "60px"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 30%)"
  },

  leftContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "520px"
  },

  logo: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "50px"
  },

  heroTitle: {
    fontSize: "56px",
    lineHeight: 1.1,
    fontWeight: "800",
    marginBottom: "24px"
  },

  heroText: {
    fontSize: "18px",
    lineHeight: 1.7,
    opacity: 0.92,
    marginBottom: "40px"
  },

  features: {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },

  feature: {
    background:
      "rgba(255,255,255,0.12)",
    border:
      "1px solid rgba(255,255,255,0.15)",
    padding: "14px 18px",
    borderRadius: "14px",
    backdropFilter: "blur(12px)",
    width: "fit-content",
    fontWeight: "500"
  },

  // ======================
  // RIGHT
  // ======================

  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    borderRadius: "28px",
    padding: "42px",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.08)"
  },

  cardHeader: {
    marginBottom: "32px"
  },

  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#64748b",
    lineHeight: 1.6
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px"
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "14px"
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #dbe3ec",
    outline: "none",
    fontSize: "15px"
  },

  button: {
    background:
      "linear-gradient(135deg, #000000, #7b56ab)",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    marginTop: "8px",
    boxShadow:
      "0 10px 25px rgba(79,70,229,0.25)"
  },

  footer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px",
    marginTop: "10px",
    color: "#64748b"
  },

  link: {
    color: "#4f46e5",
    fontWeight: "700",
    cursor: "pointer"
  }

};

export default Signup;