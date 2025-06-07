import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { adminService } from '../../services/adminService';
import AdminHeader from '../../components/admin/AdminHeader';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalBikes: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminService.getVehicleCount();
      setStats({ totalBikes: data });
      setRetryCount(0);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError(error.message);
      toast.error(error.message);
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(fetchStats, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchStats();
  };

  if (loading && retryCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminHeader />
        <div className="pt-32 md:pt-24 min-h-[calc(100vh-6rem)] flex items-center justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-300">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminHeader />
      
      <main className="pt-32 md:pt-24 min-h-[calc(100vh-6rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-12 md:mb-8 p-4 bg-red-900/50 border-l-4 border-red-500 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-200">{error}</p>
                  {retryCount > 0 && (
                    <p className="mt-1 text-sm text-red-300">
                      Retry attempt {retryCount} of 3
                    </p>
                  )}
                  <button
                    onClick={handleRetry}
                    className="mt-3 inline-flex items-center px-4 py-2 border border-red-700 text-sm font-medium rounded-lg text-white bg-red-900/50 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Welcome Section */}
          <div className="mb-12 md:mb-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-xl p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{t('adminDashboard')}</h2>
                    <p className="text-base md:text-lg text-gray-300 mt-1">{t('welcomeBack')}, {user?.username}</p>
                  </div>
                </div>
              </div>
              {/* Desktop Navigation - Hidden on Mobile */}
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => navigate('/admin/bikes/add')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-md hover:shadow-lg border-gray-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {t('addNewBike')}
                </button>
                <button
                  onClick={() => navigate('/admin/bikes')}
                  className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-xl text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  {t('manageBikes')}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Bikes Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-6 border border-gray-700 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">{t('totalBikes')}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalBikes}</p>
                  <p className="text-sm text-gray-400 mt-1">Active listings</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-6 border border-gray-700 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Quick Actions</p>
                  <p className="text-3xl font-bold text-white mt-1">2</p>
                  <p className="text-sm text-gray-400 mt-1">Available actions</p>
                </div>
              </div>
            </div>

            {/* System Status Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-6 border border-gray-700 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">System Status</p>
                  <p className="text-3xl font-bold text-white mt-1">Active</p>
                  <p className="text-sm text-gray-400 mt-1">All systems operational</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-gray-300">System Online</span>
                  </div>
                  <span className="text-sm text-gray-400">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Grid Navigation - Only visible on mobile */}
          <div className="grid grid-cols-2 gap-6 md:hidden mt-12">
            {/* Add New Bike */}
            <button
              onClick={() => navigate('/admin/bikes/add')}
              className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:bg-gray-800 transition-all duration-200 flex flex-col items-center justify-center space-y-5 group"
            >
              <div className="p-4 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center px-2 leading-tight">{t('addNewBike')}</span>
            </button>

            {/* Manage Bikes */}
            <button
              onClick={() => navigate('/admin/bikes')}
              className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:bg-gray-800 transition-all duration-200 flex flex-col items-center justify-center space-y-5 group"
            >
              <div className="p-4 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-200">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-300 text-center px-2 leading-tight">{t('manageBikes')}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
