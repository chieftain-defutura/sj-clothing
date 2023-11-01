import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './src/utils/locals/en.json'
import fi from './src/utils/locals/fi.json'
import se from './src/utils/locals/se.json'
import * as Localization from 'expo-localization'

const getLangCode = () => {
  const code = Localization.getLocales().shift()
  if (!code) return 'en'
  return code.languageCode
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLangCode(),
  defaultNS: 'translation',
  interpolation: {
    // We disable this because it's not required, given that react already scapes the text
    escapeValue: false,
  },
  // Here you can add all your supported languages
  resources: {
    fi: fi,
    en: en,
    se: se,
  },
})

export default i18n
