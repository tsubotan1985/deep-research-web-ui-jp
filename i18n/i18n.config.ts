import en from '~~/i18n/en.json'
import ja from '~~/i18n/ja.json'
import fr from '~~/i18n/fr.json'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  availableLocales: ['en', 'ja', 'fr'],
  messages: {
    en,
    ja,
    fr,
  },
}))
