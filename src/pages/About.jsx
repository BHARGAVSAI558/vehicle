import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';
import { 
  MapPinIcon, 
  ClockIcon, 
  PhoneIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  WrenchScrewdriverIcon,
  UserGroupIcon,
  StarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function About() {
  const { language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      about: "About DBS",
      aboutSubtitle: "Your Trusted Partner in Two-Wheelers",
      ourShowroom: "Our Showroom",
      location: "Location",
      address: "DBS Bike Showroom, Main Road, Mylavaram, Andhra Pradesh - 521230",
      googleMapsUrl: "https://maps.app.goo.gl/oMUV2RaCNVHiS7oX7",
      businessHours: "Business Hours",
      timing: "9:00 AM - 8:00 PM (Monday - Sunday)",
      contactPerson: "Contact Person",
      contactName: "Naveen",
      contactNumber: "9963545576",
      ourServices: "Our Services",
      qualityAssurance: "Quality Assurance",
      qualityAssuranceDesc: "Every bike undergoes a thorough quality check before delivery. We ensure you get only the best.",
      easyFinancing: "Easy Financing",
      easyFinancingDesc: "Flexible financing options with competitive interest rates. Quick loan approval process.",
      afterSalesService: "After Sales Service",
      afterSalesServiceDesc: "Comprehensive service support with trained technicians and genuine spare parts.",
      whyChooseUs: "Why Choose DBS",
      trustedDealer: "Trusted Dealer",
      trustedDealerDesc: "Authorized dealer for multiple premium brands with years of experience.",
      bestPrices: "Best Prices",
      bestPricesDesc: "Competitive pricing with transparent deals. No hidden charges.",
      expertSupport: "Expert Support",
      expertSupportDesc: "Professional team to guide you through selection, purchase, and maintenance."
    },
    te: {
      about: "డీబీఎస్ గురించి",
      aboutSubtitle: "మీ విశ్వసనీయ టూ-వీలర్ భాగస్వామి",
      ourShowroom: "మా షోరూమ్",
      location: "స్థానం",
      address: "డీబీఎస్ బైక్ షోరూమ్, మెయిన్ రోడ్, మైలవరం, ఆంధ్రప్రదేశ్ - 521230",
      googleMapsUrl: "https://maps.app.goo.gl/oMUV2RaCNVHiS7oX7",
      businessHours: "వ్యాపార గంటలు",
      timing: "ఉదయం 9:00 - రాత్రి 8:00 (సోమవారం - ఆదివారం)",
      contactPerson: "సంప్రదించండి",
      contactName: "నవీన్",
      contactNumber: "9963545576",
      ourServices: "మా సేవలు",
      qualityAssurance: "నాణ్యత హామీ",
      qualityAssuranceDesc: "ప్రతి బైక్ డెలివరీకి ముందు పూర్తి నాణ్యత తనిఖీ చేయబడుతుంది. మీకు ఉత్తమమైనది మాత్రమే అందిస్తాము.",
      easyFinancing: "సులభ ఫైనాన్సింగ్",
      easyFinancingDesc: "పోటీ వడ్డీ రేట్లతో సరైన ఫైనాన్సింగ్ ఎంపికలు. త్వరిత రుణ ఆమోద ప్రక్రియ.",
      afterSalesService: "ఆఫ్టర్ సేల్స్ సేవ",
      afterSalesServiceDesc: "అనుభవజ్ఞులైన టెక్నిషియన్లు మరియు అసలు స్పేర్ పార్ట్స్ తో సమగ్ర సేవా మద్దతు.",
      whyChooseUs: "ఎందుకు డీబీఎస్",
      trustedDealer: "విశ్వసనీయ డీలర్",
      trustedDealerDesc: "బహుళ ప్రీమియం బ్రాండ్లకు అధికృత డీలర్, సంవత్సరాల అనుభవంతో.",
      bestPrices: "ఉత్తమ ధరలు",
      bestPricesDesc: "పారదర్శకమైన డీల్స్ తో పోటీ ధరలు. దాచిన ఛార్జీలు లేవు.",
      expertSupport: "నిపుణుల మద్దతు",
      expertSupportDesc: "ఎంపిక, కొనుగోలు మరియు నిర్వహణలో మిమ్మల్ని మార్గనిర్దేశం చేసే ప్రొఫెషనల్ బృందం."
    }
  };

  const getTranslation = (key) => content[language][key] || content.en[key];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section with Gradient */}
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="pt-28 pb-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
                  <img 
                    src="https://static.vecteezy.com/system/resources/previews/013/478/513/non_2x/motorcycle-logo-free-vector.jpg"
                    alt="DBS Logo"
                    className="h-20 w-20 object-contain bg-white rounded-full p-2 shadow-lg"
                  />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                {getTranslation('about')}
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
                {getTranslation('aboutSubtitle')}
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
          {/* Showroom Info Card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="p-3 bg-primary-50 rounded-xl mr-4 shadow-sm flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  {getTranslation('ourShowroom')}
                </h2>
                <div className="h-12 w-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-primary-600 font-semibold text-sm">DBS</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <MapPinIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-gray-900">{getTranslation('location')}</h3>
                    <a 
                      href={getTranslation('googleMapsUrl')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                    >
                      {getTranslation('address')}
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <ClockIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-gray-900">{getTranslation('businessHours')}</h3>
                    <p className="mt-1.5 text-gray-600">{getTranslation('timing')}</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <PhoneIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold text-gray-900">{getTranslation('contactPerson')}</h3>
                    <p className="mt-1.5 text-gray-600">{getTranslation('contactName')}</p>
                    <a 
                      href={`tel:${getTranslation('contactNumber')}`}
                      className="mt-1.5 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                    >
                      {getTranslation('contactNumber')}
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services and Why Choose Us */}
          <div className="space-y-8">
            {/* Services Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="p-3 bg-primary-50 rounded-xl mr-4 shadow-sm flex-shrink-0">
                      <WrenchScrewdriverIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    {getTranslation('ourServices')}
                  </h2>
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">24/7</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Quality Assurance */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{getTranslation('qualityAssurance')}</h3>
                      <p className="mt-1.5 text-gray-600">{getTranslation('qualityAssuranceDesc')}</p>
                    </div>
                  </div>

                  {/* Easy Financing */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{getTranslation('easyFinancing')}</h3>
                      <p className="mt-1.5 text-gray-600">{getTranslation('easyFinancingDesc')}</p>
                    </div>
                  </div>

                  {/* After Sales Service */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <WrenchScrewdriverIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold text-gray-900">{getTranslation('afterSalesService')}</h3>
                      <p className="mt-1.5 text-gray-600">{getTranslation('afterSalesServiceDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="p-3 bg-primary-50 rounded-xl mr-4 shadow-sm flex-shrink-0">
                      <StarIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    {getTranslation('whyChooseUs')}
                  </h2>
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">Best</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Trusted Dealer */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 transform transition-all duration-300 hover:shadow-lg group">
                    <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{getTranslation('trustedDealer')}</h3>
                    <p className="text-sm text-gray-600 text-center">{getTranslation('trustedDealerDesc')}</p>
                  </div>

                  {/* Best Prices */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 transform transition-all duration-300 hover:shadow-lg group">
                    <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <CurrencyDollarIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{getTranslation('bestPrices')}</h3>
                    <p className="text-sm text-gray-600 text-center">{getTranslation('bestPricesDesc')}</p>
                  </div>

                  {/* Expert Support */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 transform transition-all duration-300 hover:shadow-lg group">
                    <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <UserGroupIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{getTranslation('expertSupport')}</h3>
                    <p className="text-sm text-gray-600 text-center">{getTranslation('expertSupportDesc')}</p>
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