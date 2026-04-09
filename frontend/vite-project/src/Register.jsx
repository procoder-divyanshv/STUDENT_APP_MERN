 import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        course: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/register", form);
            alert(res.data.message);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input placeholder="Name"
                onChange={e => setForm({...form, name: e.target.value})} />

            <input placeholder="Email"
                onChange={e => setForm({...form, email: e.target.value})} />

            <input type="password" placeholder="Password"
                onChange={e => setForm({...form, password: e.target.value})} />

            <input placeholder="Course"
                onChange={e => setForm({...form, course: e.target.value})} />

            <button>Register</button>
        </form>
    );
}