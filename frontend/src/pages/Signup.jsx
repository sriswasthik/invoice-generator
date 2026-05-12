import { useState } from "react";
import api from "../api/api";

function Signup({ setAuthPage }) {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const signup = async () => {

    try {

      setLoading(true);

      await api.post("/auth/signup", form);

      alert("Account created successfully");

      setAuthPage("login");

    } catch (err) {

      alert(
        err.response?.data?.error || "Signup failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Create Account</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={signup}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p
          style={styles.link}
          onClick={() => setAuthPage("login")}
        >
          Already have an account? Login
        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc"
  },

  card: {
    width: "320px",
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    border: "1px solid #e2e8f0"
  },

  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontSize: "14px"
  }

};

export default Signup;