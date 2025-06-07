import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

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
      const response = await fetch('http://localhost:2027/admin/checkadminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userData = await response.json();
        sessionStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAdminLoggedIn(true);
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin');
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
      return { success: false, error: 'Login failed. Please check your credentials.' };
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-300">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

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