import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/adminService';
import AdminHeader from '../../components/admin/AdminHeader';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'react-hot-toast';

export default function AdminHome() {
  const [stats, setStats] = useState({
    totalBikes: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const count = await adminService.getVehicleCount();
      setStats({ totalBikes: count });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminHeader />
        <div className="pt-24 min-h-[calc(100vh-6rem)] flex items-center justify-center">
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
          {error && (
            <div className="mb-8 p-4 bg-red-900/50 border-l-4 border-red-500 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-200">{error}</p>
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
          <div className="mb-12 md:mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-6 border border-gray-700 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-300">{t('totalBikes')}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalBikes}</p>
                  <p className="text-sm text-gray-400 mt-1">Active listings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Grid Navigation */}
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

          {/* Desktop Grid Navigation */}
          <div className="hidden md:grid grid-cols-2 gap-8 mt-8">
            <button
              onClick={() => navigate('/admin/bikes/add')}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-700 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-gray-800 rounded-xl shadow-md mb-4 group-hover:bg-gray-700 transition-colors duration-200 border border-gray-700">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('addNewBike')}</h3>
                <p className="text-gray-300">{t('addNewBikeDesc')}</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/bikes')}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-700 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-gray-800 rounded-xl shadow-md mb-4 group-hover:bg-gray-700 transition-colors duration-200 border border-gray-700">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('manageBikes')}</h3>
                <p className="text-gray-300">{t('manageBikesDesc')}</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
