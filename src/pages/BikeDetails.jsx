import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { vehicleService } from '../services/vehicleService';
import { PhoneIcon, ChatBubbleLeftRightIcon, MapPinIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function BikeDetails() {
  const { vid } = useParams(); // Changed from id to vid to match the backend
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageErrors, setImageErrors] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!vid || vid === 'undefined') {
      setError('Invalid vehicle ID');
      setLoading(false);
      navigate('/bikes'); // Redirect to bike list
      return;
    }
    fetchBikeDetails();
  }, [vid, navigate]);

  const fetchBikeDetails = async () => {
    try {
      setLoading(true);
      setError('');

      if (!vid || vid === 'undefined') {
        throw new Error('Invalid vehicle ID');
      }

      console.log('Fetching details for vehicle:', vid);
      const data = await vehicleService.getVehicleById(vid);
      
      if (!data) {
        throw new Error('Vehicle not found');
      }

      // Ensure we have a vid field for consistency
      const bikeData = {
        ...data,
        vid: data.id || data.vid // Use id if vid is not present
      };

      console.log('Received vehicle data:', bikeData);
      setBike(bikeData);
    } catch (error) {
      console.error('Error fetching bike details:', error);
      const errorMessage = error.message || t('errorLoadingBike');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    toast.error(t('errorLoadingImage'));
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">{error}</p>
              <div className="space-x-4">
                <button
                  onClick={fetchBikeDetails}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  {t('retry')}
                </button>
                <Link
                  to="/bikes"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  {t('backToBikes')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle bike not found
  if (!bike) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">{t('bikeNotFound')}</p>
              <Link to="/bikes" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                {t('backToBikes')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Back Button */}
          <Link 
            to="/bikes" 
            className="inline-flex items-center text-gray-600 hover:text-yellow-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{t('backToBikes')}</span>
          </Link>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                <div className="relative aspect-square overflow-hidden">
                  {imageErrors[0] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                      <PhotoIcon className="h-8 w-8 mb-1" />
                      <p className="text-xs">{t('imageLoadError')}</p>
                    </div>
                  ) : (
                    <img
                      src={vehicleService.getVehicleImages(bike.vid || bike.id)}
                      alt={bike.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(0)}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Bike Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">{bike.name}</h1>
                    <p className="text-sm text-gray-600 mt-0.5">{bike.brand}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-50 text-yellow-800 rounded-full text-xs font-medium">
                      Pre-owned
                    </span>
                  </div>
                  {bike.financeAvailable && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      {t('financeAvailable')}
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-semibold text-yellow-800">
                      ₹{bike.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">(Negotiable)</span>
                  </div>
                </div>

                {/* Bike Details */}
                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t('modelYear')}</p>
                      <p className="text-sm font-medium text-gray-900 mt-0.5">{bike.modelYear}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t('color')}</p>
                      <p className="text-sm font-medium text-gray-900 mt-0.5">{bike.color}</p>
                    </div>
                  </div>

                  {bike.description && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">About this Bike</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{bike.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-base font-medium text-gray-900">Contact Seller</h2>
                  <p className="text-xs text-gray-600 mt-0.5">Interested in this {bike.brand} {bike.name}? Contact the seller directly!</p>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Phone Call */}
                    <a
                      href={`tel:+919963545576`}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-yellow-50 rounded-md">
                          <PhoneIcon className="h-4 w-4 text-yellow-800" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">Call Seller</p>
                          <p className="text-xs text-gray-500">+91 99635 45576</p>
                        </div>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/919963545576?text=Hi, I'm interested in your ${encodeURIComponent(bike.brand + ' ' + bike.name)} listed for ₹${bike.price.toLocaleString()}. Is it still available?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-green-50 rounded-md">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">WhatsApp</p>
                          <p className="text-xs text-gray-500">Chat with Seller</p>
                        </div>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <div className="p-1.5 bg-blue-50 rounded-md mt-0.5">
                          <MapPinIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">View Location</p>
                          <p className="text-xs text-gray-600 mt-0.5">DBS Bike Showroom, Main Road, Mylavaram, Andhra Pradesh - 521230</p>
                          <a 
                            href="https://maps.app.goo.gl/oMUV2RaCNVHiS7oX7" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-800 text-xs hover:text-yellow-900 mt-1 inline-block group"
                          >
                            View on Map
                            <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 