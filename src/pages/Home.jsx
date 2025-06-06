import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../services/vehicleService';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useLanguage();
  const [imageErrors, setImageErrors] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: bikes = [], isLoading, isError } = useQuery({
    queryKey: ['allBikesHome'],
    queryFn: vehicleService.getAllVehicles,
    select: (data) => data.filter(bike => bike.vid || bike.id).slice(0, 3),
  });

  const handleImageError = (bikeId) => {
    setImageErrors(prev => ({ ...prev, [bikeId]: true }));
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-transparent mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:py-32 lg:py-40 flex items-center">
          <div className="max-w-4xl text-left">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/013/478/513/non_2x/motorcycle-logo-free-vector.jpg"
                alt="DBS Logo"
                className="h-14 w-14 object-contain bg-white rounded-full p-2 shadow-lg"
              />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                {t('findPerfectRide')}
              </h1>
            </div>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl">
              {t('browseCollection')}
            </p>
            <div className="mt-10">
              <Link
                to="/bikes"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {t('browseBikesButton')}
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Bikes Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            {t('latestBikes')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Check out our latest additions to the collection.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">{t('errorLoadingBikes')}</p>
          </div>
        ) : bikes.length === 0 ? (
           <div className="text-center py-12">
             <p className="text-lg text-gray-600">{t('noBikesFound')}</p>
           </div>
        ) : (
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {bikes.map((bike) => {
              const uniqueKey = `bike-${bike.vid || bike.id}-${bike.name.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Link
                  key={uniqueKey}
                  to={`/bikes/${bike.vid || bike.id}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
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
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-1">
                      {bike.name}
                    </h3>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{bike.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">{bike.brand}</span>
                    </div>
                     <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                       <span>{bike.modelYear}</span>
                       <span className="line-clamp-1">{bike.color}</span>
                     </div>
                    {bike.financeAvailable && (
                      <div className="mt-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {t('financeAvailable')}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/bikes"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-yellow-800 hover:bg-yellow-900 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {t('viewAllBikes')}
            <ArrowRightIcon className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Why Choose Us Section */}
          <div className="mt-16">
            <div className="flex items-center justify-center space-x-4 mb-10">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/013/478/513/non_2x/motorcycle-logo-free-vector.jpg"
                alt="DBS Logo"
                className="h-10 w-10 object-contain bg-white rounded-full p-1 shadow-sm"
              />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Choose Us</h3>
            </div>
            <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: t('qualityAssured'),
                  description: t('qualityAssuredDesc'),
                  icon: '🔍',
                },
                {
                  title: t('bestPrices'),
                  description: t('bestPricesDesc'),
                  icon: '💰',
                },
                {
                  title: t('easyProcess'),
                  description: t('easyProcessDesc'),
                  icon: '📝',
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="text-5xl mb-4 text-primary-600">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}