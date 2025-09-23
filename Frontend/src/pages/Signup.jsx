import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";   // 👈 CSS import

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup success! Please login now.");
      navigate("/"); // ✅ signup ke baad login page par bhejna
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">📝 Create Account</h2>

        <label>Username</label>
        <input
          className="signup-input"
          placeholder="Enter your username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <label>Email</label>
        <input
          className="signup-input"
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          className="signup-input"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="signup-button" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
