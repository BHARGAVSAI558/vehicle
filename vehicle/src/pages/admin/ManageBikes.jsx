import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { vehicleService } from '../../services/vehicleService';
import AdminHeader from '../../components/admin/AdminHeader';
import { toast } from 'react-hot-toast';
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function ManageBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchBikes();
  }, [user, navigate]);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getAllVehicles();
      console.log('Fetched bikes data:', data);
      setBikes(data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
      setError(t('failedToLoadBikes'));
      toast.error(t('failedToLoadBikes'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBike = async (bike) => {
    // Get the correct ID (try vid first, then id)
    const vehicleId = bike.vid || bike.id;
    
    if (!vehicleId) {
      console.error('Invalid bike object:', bike);
      toast.error('Invalid vehicle ID');
      return;
    }

    console.log('Attempting to delete bike:', { id: vehicleId, name: bike.name });
    
    if (window.confirm(`Are you sure you want to delete ${bike.name}?`)) {
      try {
        await vehicleService.deleteVehicle(vehicleId);
        // Update the bikes list by filtering out the deleted bike
        setBikes(prevBikes => prevBikes.filter(b => (b.vid || b.id) !== vehicleId));
        toast.success(`${bike.name} deleted successfully`);
      } catch (error) {
        console.error('Error deleting bike:', error);
        toast.error(error.message || 'Failed to delete bike');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminHeader />
        <div className="pt-24 min-h-[calc(100vh-6rem)] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-transparent"></div>
            <p className="text-gray-300 font-medium">Loading bikes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminHeader />

      {/* Main Content */}
      <main className="pt-32 md:pt-24 min-h-[calc(100vh-6rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
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
                </div>
              </div>
            </div>
          )}

          {/* Header Section */}
          <div className="mb-12 md:mb-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg p-6 md:p-8 border border-gray-700 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
              <div className="text-center md:text-left">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{t('manageBikes')}</h2>
                    <p className="text-base md:text-lg text-gray-300 max-w-2xl">{t('manageBikesDesc')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 mt-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span className="text-sm font-medium">Total Bikes: {bikes.length}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/admin/bikes/add')}
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-xl text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 mt-8 md:mt-0"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('addNewBike')}
              </button>
            </div>
          </div>

          {/* Bikes Table Section */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg overflow-hidden border border-gray-700 transform transition-all duration-300 hover:shadow-xl">
            {bikes.length === 0 ? (
              <div className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border border-gray-700 mb-8">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{t('noBikesFound')}</h3>
                <p className="text-gray-300 mb-8">{t('addYourFirstBike')}</p>
                <button
                  onClick={() => navigate('/admin/bikes/add')}
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-xl text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {t('addNewBike')}
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 md:px-8 py-5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        {t('bikeDetails')}
                      </th>
                      <th scope="col" className="px-4 md:px-8 py-5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        {t('price')}
                      </th>
                      <th scope="col" className="px-4 md:px-8 py-5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        {t('colors')}
                      </th>
                      <th scope="col" className="px-4 md:px-8 py-5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        {t('finance')}
                      </th>
                      <th scope="col" className="px-4 md:px-8 py-5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {bikes.map((bike) => {
                      const uniqueKey = bike.id || bike.vid || `bike-${bike.name}-${bike.brand}`;
                      const bikeId = bike.vid || bike.id;
                      return (
                        <tr key={uniqueKey} className="hover:bg-gray-800 transition-colors duration-200 group">
                          <td className="px-4 md:px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20">
                                {!bikeId ? (
                                  <div className="h-16 w-16 md:h-20 md:w-20 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200">
                                    <PhotoIcon className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
                                  </div>
                                ) : (
                                  <img
                                    src={vehicleService.getVehicleImages(bikeId)}
                                    alt={bike.name}
                                    className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200"
                                    onError={(e) => {
                                      console.error('Image load error for bike:', bikeId);
                                      e.target.onerror = null;
                                      e.target.src = '/placeholder-bike.png';
                                    }}
                                  />
                                )}
                              </div>
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="text-base font-semibold text-white group-hover:text-gray-300 transition-colors duration-200 truncate">{bike.name}</div>
                                <div className="text-sm text-gray-300 truncate">{bike.brand}</div>
                                {!bikeId && (
                                  <div className="text-xs text-red-400">Missing ID</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-8 py-6 whitespace-nowrap">
                            <div className="text-base md:text-lg font-semibold text-gray-300">₹{bike.price.toLocaleString()}</div>
                          </td>
                          <td className="px-4 md:px-8 py-6 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-300">{bike.color}</div>
                          </td>
                          <td className="px-4 md:px-8 py-6 whitespace-nowrap">
                            <span className={`px-3 py-1.5 md:px-4 md:py-2 inline-flex text-xs md:text-sm font-semibold rounded-full ${
                              bike.financeAvailable
                                ? 'bg-green-900/50 text-green-300 border border-green-700'
                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                            }`}>
                              {bike.financeAvailable ? t('available') : t('notAvailable')}
                            </span>
                          </td>
                          <td className="px-4 md:px-8 py-6 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteBike(bike)}
                              className="w-full md:w-auto inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 border border-red-700 text-xs md:text-sm font-medium rounded-lg text-white bg-red-900/50 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                            >
                              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m14 0H5m2 0V5a2 2 0 012-2h6a2 2 0 012 2v2" />
                              </svg>
                              {t('delete')}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 