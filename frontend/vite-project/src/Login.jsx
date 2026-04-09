import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/login", form);

            localStorage.setItem("token", res.data.token);

            alert("Login successful");
            navigate("/dashboard");

        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={e => setForm({ ...form, password: e.target.value })}
            />

            <button>Login</button>

            {/* 🔗 Register Link */}
            <p style={{ textAlign: "center", marginTop: "10px" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#fff", fontWeight: "bold" }}>
                    Register
                </Link>
            </p>
        </form>
    );
}