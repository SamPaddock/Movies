import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './en.json';

i18n.use(initReactI18next)
.init({
      fallbackLng: 'en',
      lng: 'en',
      resources: {
            en: { translation: en },
            ar: { translation: ar },
      },
      interpolation: {
            escapeValue: false,
      },
      react: {
            useSuspense: false,
      },
});

export default i18n;
