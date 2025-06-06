import { useLanguage } from '../../contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function LanguageSelector() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 focus:outline-none"
      aria-label={t('language')}
    >
      <GlobeAltIcon className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">{language === 'en' ? 'తెలుగు' : 'English'}</span>
      <span className="sm:hidden">{language === 'en' ? 'TE' : 'EN'}</span>
    </button>
  );
} 