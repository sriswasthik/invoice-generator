import { useState } from "react";
import api from "../api/api";

function Login({ setPage }) {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      // attach token globally
      api.defaults.headers.common["Authorization"] = res.data.token;

      alert("Login successful");

      setPage("dashboard");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2>Login</h2>

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

        <button onClick={login}>
          Login
        </button>

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
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default Login;