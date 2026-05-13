import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import api from "../api/api";

function Login({ setAuthPage }) {

    const { login: saveLogin } = useAuth();

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

    const login = async () => {

        try {

            setLoading(true);

            const res = await api.post(
                "/auth/login",
                form
            );

            // save token
            saveLogin({
                token: res.data.token,
                id: res.data.user.id,
                email: res.data.user.email
            });

            window.location.reload();

            // attach token globally
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${res.data.token}`;

            // reload app
            window.location.reload();

        } catch (err) {

            alert(
                err.response?.data?.error ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.title}>
                    Welcome Back
                </h2>

                <input
                    style={styles.input}
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button
                    style={styles.button}
                    onClick={login}
                >
                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }
                </button>

                <p
                    style={styles.link}
                    onClick={() => setAuthPage("signup")}
                >
                    Create new account
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
        width: "340px",
        background: "white",
        padding: "32px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
    },

    title: {
        marginBottom: "10px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        fontSize: "14px"
    },

    button: {
        background: "#4f46e5",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500"
    },

    link: {
        color: "#4f46e5",
        cursor: "pointer",
        fontSize: "14px",
        textAlign: "center",
        marginTop: "8px"
    }

};

export default Login;