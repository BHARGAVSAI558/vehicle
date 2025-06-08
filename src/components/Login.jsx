import { useState } from "react";
import "./admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import image from "../assets/main.png";
import { Link } from "react-router-dom";
import config from "../config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    try {
      const response = await axios.post(
        `${config.url}/admin/checkadminlogin`,
        formData
      );
      
      // ... existing code ...
    } catch (error) {
      // ... existing code ...
    }
  };

  return (
    // ... existing JSX ...
  );
};

export default Login; 