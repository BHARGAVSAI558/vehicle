import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import config from '../../config';

const Login = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { setLanguage } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      // First check if server is reachable
      try {
        await axios.get(`${config.url}/admin/vehiclecount`);
        console.log('Server is reachable');
      } catch (error) {
        console.error('Server connection test failed:', error.message);
        setMessage('Cannot connect to server. Please check if the backend is running.');
        return;
      }

      // ... existing code ...
    } catch (error) {
      console.error('Login error:', error.message);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      {/* ... existing JSX ... */}
    </div>
  );
};

export default Login; 