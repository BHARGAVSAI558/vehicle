import { useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from '../contexts/LanguageContext';
import { adminService } from '../services/adminService';
import { toast } from 'react-hot-toast';
import image from "../assets/main.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    
    try {
      // First check if server is reachable
      try {
        await adminService.getVehicleCount();
        console.log('Server is reachable');
      } catch (error) {
        console.error('Server connection test failed:', error.message);
        setMessage("Cannot connect to server. Please check if the backend is running.");
        toast.error("Server connection failed");
        setLoading(false);
        return;
      }

      // Try to login using the auth context
      const result = await login(formData.username, formData.password);
      
      if (!result.success) {
        setMessage(result.error || "Invalid Username or Password");
        toast.error(result.error || "Invalid Username or Password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={image} alt="Login" />
      </div>
      <div className="login-form-container">
        <h2>Admin Login</h2>
        {message && <div className="error-message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="signup-link">
          Not an admin? <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 