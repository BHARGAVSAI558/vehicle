import { useState } from "react";
import "./admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import image from "../assets/main.png";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    try {
      const response = await axios.post(
        "http://localhost:2027/admin/checkadminlogin",
        formData
      );
      
      if (response.data) {  // Changed from response.status === 200
        setIsAdminLoggedIn(true);
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate("/adminhome");
      } else {
        setMessage("Invalid Username or Password");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("Invalid Username or Password");
      } else {
        setMessage("Login failed: " + (error.response?.data || "An unexpected error occurred"));
      }
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src={image} alt="Admin Illustration" />
      </div>
      <div className="login-form">
        <h2>
          <span className="signin-text">Admin</span>&nbsp;
          <span className="signup-text">Login</span>
        </h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="options">
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="signin-button">Login</button>
        </form>
        <p className="signup-link">
          Not an Admin? <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
} 