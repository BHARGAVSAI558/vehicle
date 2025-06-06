import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items with icons
  const navItems = [
    { path: '/', label: t('home'), icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { path: '/bikes', label: t('bikes'), icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
    { path: '/about', label: t('about'), icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { path: '/contact', label: t('contact'), icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )}
  ];

  // Add Dashboard link for admin users
  if (user) {
    navItems.push({
      path: '/admin/home',
      label: 'Dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    });
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-white'
    }`}>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-yellow-800">DBS</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-yellow-800'
                      : 'text-gray-500 hover:text-yellow-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Right Side Buttons */}
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleLanguage}
                className="text-sm text-gray-500 hover:text-yellow-800 transition-colors duration-200"
              >
                {language === 'en' ? 'తెలుగు' : 'English'}
              </button>

              {user ? (
                <button
                  onClick={logout}
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-900 transition-colors duration-200"
                >
                  {t('logout')}
                </button>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-900 transition-colors duration-200"
                >
                  {t('adminLogin')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar - Instagram Style */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-gray-100">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-yellow-800">DBS</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="text-gray-700 text-sm"
          >
            {language === 'en' ? 'తెలుగు' : 'English'}
          </button>
          {user ? (
            <button
              onClick={logout}
              className="text-yellow-800 text-sm font-medium"
            >
              {t('logout')}
            </button>
          ) : (
            <Link
              to="/admin/login"
              className="text-yellow-800 text-sm font-medium"
            >
              {t('adminLogin')}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation - Instagram Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="grid grid-cols-4 h-16">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-0.5 ${
                isActive(item.path)
                  ? 'text-yellow-800'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} fixed inset-0 bg-white z-50 pt-14`}>
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 text-base font-medium ${
                isActive(item.path)
                  ? 'text-yellow-800'
                  : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-yellow-800">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 