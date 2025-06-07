import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AdminHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      <div className="bg-gray-900 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center space-x-3">
                <div className="bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-700">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-white">Bike Showroom</span>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="ml-8 space-x-4">
                <Link
                  to="/admin"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  {t('dashboard')}
                </Link>
                <Link
                  to="/admin/bikes"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  {t('manageBikes')}
                </Link>
                <Link
                  to="/admin/bikes/add"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  {t('addNewBike')}
                </Link>
              </nav>
            </div>

            {/* Right side - User info and Logout */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-300">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-300 hover:text-white items-center space-x-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>{t('logout')}</span>
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            {/* Top Bar */}
            <div className="flex justify-between items-center h-14 px-2">
              <Link to="/admin" className="flex items-center space-x-2">
                <div className="bg-gray-800 p-1.5 rounded-lg shadow-sm border border-gray-700">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-base font-semibold text-white">Bike Showroom</span>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-300 truncate max-w-[100px]">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors border border-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Grid Navigation */}
            <div className="grid grid-cols-3 gap-1 py-1.5 px-2 border-t border-gray-700">
              <Link
                to="/admin"
                className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 group"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-[10px] text-gray-300 group-hover:text-white">{t('dashboard')}</span>
              </Link>

              <Link
                to="/admin/bikes"
                className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 group"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="text-[10px] text-gray-300 group-hover:text-white">{t('manageBikes')}</span>
              </Link>

              <Link
                to="/admin/bikes/add"
                className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 group"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-[10px] text-gray-300 group-hover:text-white">{t('addNewBike')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Spacer div to prevent content overlap */}
      <div className="h-[88px] md:h-16"></div>
    </>
  );
} 