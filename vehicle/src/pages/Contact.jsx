import { useLanguage } from '../contexts/LanguageContext';
import { PhoneIcon, MapPinIcon, ClockIcon, UserIcon, ChatBubbleLeftRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export default function Contact() {
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section with Gradient */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="pt-28 pb-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                {t('contact')}
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
                {t('getInTouch')}
              </p>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-gray-100" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="p-3 bg-primary-50 rounded-xl mr-4 shadow-sm flex-shrink-0">
                      <UserIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    {t('showroomInfo')}
                  </h2>
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">DBS</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <MapPinIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{t('showroomAddress')}</h3>
                      <p className="mt-1.5 text-gray-600">DBS Bike Showroom, Main Road, Mylavaram, Andhra Pradesh - 521230</p>
                      <a 
                        href="https://maps.app.goo.gl/oMUV2RaCNVHiS7oX7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                      >
                        View on Google Maps
                        <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <UserIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{t('contactPerson')}</h3>
                      <p className="mt-1.5 text-gray-600">Naveen</p>
                      <a 
                        href="tel:9963545576" 
                        className="mt-3 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                      >
                        +91 99635 45576
                        <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <ClockIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{t('businessHours')}</h3>
                      <div className="mt-1.5 space-y-1">
                        <p className="text-gray-600">9:00 AM - 9:00 PM</p>
                        <p className="text-gray-500 text-sm">Monday - Saturday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="p-3 bg-primary-50 rounded-xl mr-4 shadow-sm flex-shrink-0">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  Quick Contact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="tel:9963545576"
                    className="group flex items-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover:from-primary-100 hover:to-primary-200 transition-all duration-300 shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <PhoneIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Call Us</p>
                        <p className="text-sm text-gray-600 mt-0.5">+91 99635 45576</p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/919963545576"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">WhatsApp</p>
                        <p className="text-sm text-gray-600 mt-0.5">Chat with us</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Visit Us Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="p-3 bg-primary-50 rounded-xl mr-4 shadow-sm flex-shrink-0">
                      <MapPinIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    {t('visitUs')}
                  </h2>
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">24/7</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <ClockIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{t('bestTimeToVisit')}</h3>
                      <p className="mt-1.5 text-gray-600">{t('bestTimeToVisitDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{t('testRide')}</h3>
                      <p className="mt-1.5 text-gray-600">{t('testRideDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{t('easyFinancing')}</h3>
                      <p className="mt-1.5 text-gray-600">{t('easyFinancingDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="p-3 bg-primary-50 rounded-xl mr-4 shadow-sm flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  Location
                </h2>
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 mb-4">
                    <p className="text-gray-900 font-medium">DBS Bike Showroom</p>
                    <p className="text-gray-600 mt-1">Main Road, Mylavaram</p>
                    <p className="text-gray-600">Andhra Pradesh - 521230</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 text-primary-600" />
                    <span>9:00 AM - 9:00 PM (Monday - Saturday)</span>
                  </div>
                </div>
                <a 
                  href="https://maps.app.goo.gl/oMUV2RaCNVHiS7oX7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative w-full h-[320px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                        <MapPinIcon className="w-8 h-8 text-primary-600" />
                      </div>
                      <span className="text-primary-600 font-medium text-lg">View on Google Maps</span>
                      <p className="text-gray-500 mt-2 text-sm">Click to open location</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 