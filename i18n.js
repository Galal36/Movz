// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to MovieDB',
      favorites: 'Favorites',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      yourFavoriteMovies: 'Your Favorite Movies',
      noFavorites: "You haven't added any favorites yet!",
      remove: 'Remove',
    },
  },
  ar: {
    translation: {
      welcome: 'مرحبًا بك في موفي دي بي',
      favorites: 'المفضلة',
      logout: 'تسجيل الخروج',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      yourFavoriteMovies: 'أفلامك المفضلة',
      noFavorites: 'لم تقم بإضافة أي أفلام مفضلة بعد!',
      remove: 'إزالة',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
