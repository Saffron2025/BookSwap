import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);   // 👈 loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    const payload = form.identifier.includes("@")
      ? { email: form.identifier, password: form.password }
      : { username: form.identifier, password: form.password };

    try {
      const res = await api.post("/auth/login", payload);
      localStorage.setItem("token", res.data.token);
      navigate("/books");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">📚 Welcome Back</h2>

        <label>Email or Username</label>
        <input
          className="login-input"
          placeholder="Enter your email or username"
          value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          className="login-input"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "⏳ Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
