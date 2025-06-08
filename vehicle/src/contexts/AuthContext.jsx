import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const adminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (adminLoggedIn === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const result = await adminService.login(username, password);
      if (result.success) {
        setUser(result.data);
        setIsAuthenticated(true);
        setIsAdminLoggedIn(true);
        sessionStorage.setItem('user', JSON.stringify(result.data));
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        sessionStorage.setItem('adminUsername', username);
        navigate('/admin');
        return { success: true };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdminLoggedIn,
      user,
      error,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 