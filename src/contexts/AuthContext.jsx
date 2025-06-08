import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        const storedAdminStatus = localStorage.getItem('isAdminLoggedIn');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          if (storedAdminStatus === 'true') {
            setIsAdminLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        sessionStorage.removeItem('user');
        localStorage.removeItem('isAdminLoggedIn');
        setUser(null);
        setIsAdminLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const userData = await adminService.login({ username, password });
      
      sessionStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAdminLoggedIn(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('isAdminLoggedIn');
    setUser(null);
    setIsAdminLoggedIn(false);
    setError(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAuthenticated: !!user,
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      loading,
      error,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 