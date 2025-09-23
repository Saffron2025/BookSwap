import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">📚 BookSwap</div>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/books" className="nav-link">Books</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/requests" className="nav-link">Requests</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
