import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './src/utils/locals/en.json'
import de from './src/utils/locals/de.json'
import es from './src/utils/locals/es.json'
import fr from './src/utils/locals/fr.json'
import it from './src/utils/locals/it.json'
import ja from './src/utils/locals/ja.json'
import ar from './src/utils/locals/ar.json'
import da from './src/utils/locals/da.json'
import du from './src/utils/locals/du.json'
import ge from './src/utils/locals/ge.json'
import In from './src/utils/locals/in.json'
import ko from './src/utils/locals/zh.json'
import po from './src/utils/locals/po.json'
import por from './src/utils/locals/por.json'
import ru from './src/utils/locals/ru.json'
import ta from './src/utils/locals/ta.json'
import tu from './src/utils/locals/tu.json'
import uk from './src/utils/locals/uk.json'
import zh from './src/utils/locals/zh.json'
import ch from './src/utils/locals/ch.json'
import la from './src/utils/locals/la.json'

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
    ar: ar,
    da: da,
    du: du,
    ge: ge,
    in: In,
    ko: ko,
    po: po,
    por: por,
    ru: ru,
    ta: ta,
    tu: tu,
    uk: uk,
    ch: ch,
    la: la,
  },
})

export default i18n
