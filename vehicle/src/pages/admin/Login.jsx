import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { adminService } from '../../services/adminService';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { id, value } = e.target; // Fixed typo here
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      // Check if server is reachable
      try {
        await adminService.getVehicleCount();
        console.log('Server is reachable');
      } catch (error) {
        console.error('Server connection test failed:', error.message);
        setMessage('Cannot connect to server. Please check if the backend is running.');
        toast.error('Server connection failed');
        setLoading(false);
        return;
      }

      // Try to login using the auth context
      const result = await login(formData.username, formData.password);
      
      if (!result.success) {
        setMessage(result.error || 'Invalid Username or Password');
        toast.error(result.error || 'Invalid Username or Password');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please try again.');
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t('adminLogin')}
            </h2>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <p>{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                {t('username')}
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2.5 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder={t('username')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2.5 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder={t('password')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {t('notAdmin')}{' '}
              <a href="/" className="font-medium text-primary-600 hover:text-primary-700">
                {t('backToHome')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
