import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [student, setStudent] = useState({});
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const [course, setCourse] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/dashboard");
                setStudent(res.data.student);
            } catch (err) {
                alert("Unauthorized");
                navigate("/");
            }
        };
        fetchData();
    }, []);

    const updatePassword = async () => {
        try {
            const res = await API.put("/update-password", passwordData);
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    const updateCourse = async () => {
        try {
            const res = await API.put("/update-course", { course });
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <h2>Dashboard</h2>

            <p>Name: {student.name}</p>
            <p>Email: {student.email}</p>
            <p>Course: {student.course}</p>

            <hr />

            <h3>Update Password</h3>
            <input placeholder="Old Password"
                onChange={e => setPasswordData({...passwordData, oldPassword: e.target.value})} />

            <input placeholder="New Password"
                onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} />

            <button onClick={updatePassword}>Update Password</button>

            <hr />

            <h3>Change Course</h3>
            <input placeholder="New Course"
                onChange={e => setCourse(e.target.value)} />

            <button onClick={updateCourse}>Update Course</button>

            <hr />

            <button onClick={logout}>Logout</button>
        </div>
    );
}