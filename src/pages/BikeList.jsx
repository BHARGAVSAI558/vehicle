import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { vehicleService } from '../services/vehicleService';
import { MagnifyingGlassIcon, PhotoIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function BikeList() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [bikes, setBikes] = useState([]);
  const [allBikes, setAllBikes] = useState([]); // Store all bikes separately
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getAllVehicles();
      // Ensure each bike has a valid vid
      const validBikes = data.filter(bike => bike.vid || bike.id);
      setBikes(validBikes);
      setAllBikes(validBikes); // Store all bikes
    } catch (error) {
      console.error('Error fetching bikes:', error);
      setError(t('errorLoadingBikes'));
      toast.error(t('errorLoadingBikes'));
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (bikeId) => {
    setImageErrors(prev => ({ ...prev, [bikeId]: true }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      clearSearch();
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase().trim();
    
    const filteredBikes = allBikes.filter(bike => 
      bike.name.toLowerCase().includes(query) ||
      bike.brand.toLowerCase().includes(query) ||
      bike.color.toLowerCase().includes(query) ||
      bike.modelYear.toString().includes(query) ||
      bike.price.toString().includes(query)
    );
    setBikes(filteredBikes);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setBikes(allBikes);
    setIsSearching(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      clearSearch();
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-lg text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchBikes}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              {t('retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder={t('searchBikes')}
                  className="w-full px-4 py-4 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              {isSearching && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {bikes.length} {bikes.length === 1 ? t('bikeFound') : t('bikesFound')}
                  </p>
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center"
                  >
                    <ArrowPathIcon className="w-4 h-4 mr-1" />
                    {t('clearSearch')}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : bikes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-4">{t('noBikesFound')}</p>
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200"
                >
                  <ArrowPathIcon className="w-4 h-4 mr-2" />
                  {t('clearSearch')}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.map((bike) => {
                const uniqueKey = `bike-${bike.vid || bike.id}-${bike.name.toLowerCase().replace(/\s+/g, '-')}`;
                
                return (
                  <Link
                    key={uniqueKey}
                    to={`/bikes/${bike.vid || bike.id}`}
                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      {imageErrors[bike.vid || bike.id] ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500">
                          <PhotoIcon className="h-12 w-12 mb-2" />
                          <p className="text-sm">{t('imageLoadError')}</p>
                        </div>
                      ) : (
                        <img
                          src={vehicleService.getVehicleImages(bike.vid || bike.id)}
                          alt={bike.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          onError={() => handleImageError(bike.vid || bike.id)}
                        />
                      )}
                      {bike.financeAvailable && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 shadow-sm group-hover:bg-green-50 transition-colors duration-200">
                            {t('financeAvailable')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col group-hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-500 transition-colors duration-200 line-clamp-1">
                        {bike.name}
                      </h3>
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-500 transition-colors duration-200">
                          ₹{bike.price.toLocaleString()}
                        </span>
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-gray-200 transition-colors duration-200">
                          {bike.brand}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-gray-100 transition-colors duration-200">
                          {bike.modelYear}
                        </span>
                        <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-full line-clamp-1 group-hover:bg-gray-100 transition-colors duration-200">
                          {bike.color}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 