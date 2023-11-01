import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './src/utils/locals/en.json'
import de from './src/utils/locals/de.json'
import es from './src/utils/locals/es.json'
import fr from './src/utils/locals/fr.json'
import it from './src/utils/locals/it.json'
import ja from './src/utils/locals/ja.json'
import zh from './src/utils/locals/zh.json'

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
    en: en,
    de: de,
    es: es,
    fr: fr,
    it: it,
    ja: ja,
    zh: zh,
  },
})

export default i18n
