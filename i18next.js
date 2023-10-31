import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    resources: {
      en: require('./src/utils/locals/en.json'),
      it: require('./src/utils/locals/it.json'),
      zh: require('./src/utils/locals/zh.json'),
      es: require('./src/utils/locals/es.json'),
    },
    // interpolation: {
    //   escapeValue: false, // React already does escaping
    // },
    // react: {
    //   useSuspense: false, // React Native doesn't support Suspense yet
    // },
  })

export default i18n
