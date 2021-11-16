import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translations from '~/translations'

export const resources = translations

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources
  })

export default i18n
