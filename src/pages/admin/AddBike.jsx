import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { vehicleService } from '../../services/vehicleService';
import AdminHeader from '../../components/admin/AdminHeader';
import { toast } from 'react-hot-toast';

export default function AddBike() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    modelYear: '',
    description: '',
    color: '',
    financeAvailable: false,
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);
    
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const removeImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.name || !formData.brand || !formData.price || !formData.modelYear || !formData.image) {
        throw new Error('Please fill in all required fields and upload an image');
      }

      // Convert price to number
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error('Please enter a valid price');
      }

      // Convert modelYear to number
      const modelYear = parseInt(formData.modelYear);
      if (isNaN(modelYear) || modelYear < 1900 || modelYear > new Date().getFullYear()) {
        throw new Error('Please enter a valid model year');
      }

      // Create FormData for multipart/form-data
      const submitData = new FormData();
      
      // Match exact database column names
      submitData.append('name', formData.name.trim());
      submitData.append('brand', formData.brand.trim());
      submitData.append('price', price.toString());
      submitData.append('modelYear', modelYear.toString());
      submitData.append('description', (formData.description || '').trim());
      submitData.append('color', (formData.color || '').trim());
      submitData.append('financeAvailable', formData.financeAvailable ? '1' : '0');
      submitData.append('vehicleimage', formData.image);

      // Log the exact data being sent
      console.log('Submitting bike data with exact field names:', {
        name: formData.name,
        brand: formData.brand,
        price: price,
        modelYear: modelYear,
        description: formData.description,
        color: formData.color,
        financeAvailable: formData.financeAvailable ? '1' : '0',
        vehicleimage: {
          name: formData.image.name,
          type: formData.image.type,
          size: formData.image.size
        }
      });

      const response = await vehicleService.addVehicle(submitData);
      console.log('Server response:', response);
      
      toast.success('Bike added successfully!');
      navigate('/admin/bikes');
    } catch (err) {
      console.error('Error adding bike:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add bike. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminHeader />

      {/* Main Content */}
      <main className="pt-32 md:pt-24 min-h-[calc(100vh-6rem)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Header */}
          <div className="mb-12 md:mb-8 bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{t('addNewBike')}</h2>
                <p className="text-base md:text-lg text-gray-300 mt-2">{t('addNewBikeDesc')}</p>
              </div>
              <button
                onClick={() => navigate('/admin/bikes')}
                className="w-full md:w-auto inline-flex items-center px-4 py-2.5 border border-gray-600 text-base font-medium rounded-xl text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('backToBikes')}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
              {error && (
                <div className="p-4 bg-red-900/50 border-l-4 border-red-500 rounded-md">
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

              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      {t('bikeName')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                      placeholder="e.g., Royal Enfield Classic 350"
                    />
                  </div>

                  {/* Brand */}
                  <div className="space-y-2">
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-300">
                      {t('brand')} *
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                      placeholder="e.g., Royal Enfield"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                      {t('price')} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 text-sm">₹</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>

                  {/* Model Year */}
                  <div className="space-y-2">
                    <label htmlFor="modelYear" className="block text-sm font-medium text-gray-300">
                      {t('modelYear')} *
                    </label>
                    <input
                      type="number"
                      id="modelYear"
                      name="modelYear"
                      value={formData.modelYear}
                      onChange={handleChange}
                      required
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                      placeholder="e.g., 2023"
                    />
                  </div>

                  {/* Color */}
                  <div className="space-y-2">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-300">
                      {t('color')}
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                      placeholder="e.g., Black, Red"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Description</h3>
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                    {t('description')}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-colors resize-none"
                    placeholder="Enter detailed description of the bike..."
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Bike Image</h3>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 bg-gray-800 hover:bg-gray-700 transition-colors text-center cursor-pointer"
                     onClick={() => fileInputRef.current?.click()}
                >
                  {previewImage ? (
                    <div className="relative w-full max-w-sm mx-auto">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-base text-gray-300 mb-2">Drag 'n' drop an image here, or click to select</p>
                      <p className="text-sm text-gray-400">PNG, JPG, GIF (max 10MB)</p>
                    </div>
                  )}
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </div>
              </div>

              {/* Finance Available */}
              <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <input
                  type="checkbox"
                  id="financeAvailable"
                  name="financeAvailable"
                  checked={formData.financeAvailable}
                  onChange={handleChange}
                  className="h-5 w-5 text-gray-600 focus:ring-gray-500 border-gray-600 rounded transition-colors bg-gray-700"
                />
                <label htmlFor="financeAvailable" className="text-base font-medium text-gray-300">
                  {t('financeAvailable')}
                </label>
              </div>

              {/* Form Status */}
              {!formData.image && (
                <div className="text-center text-base text-gray-300 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  Please upload an image to enable the Add Bike button.
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate('/admin/bikes')}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.image}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-medium transition-colors duration-200 
                    ${loading || !formData.image 
                      ? 'bg-gray-700 cursor-not-allowed' 
                      : 'bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm border border-gray-600'
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Bike
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 