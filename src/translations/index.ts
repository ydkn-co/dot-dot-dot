import en from './en.json'

const NAMESPACE = 'translation'

const locales = {
  en
}
type Translation = keyof typeof locales.en;

type NamespacedTranslation = Record<string, Translation>

type Resources = Record<string, NamespacedTranslation>;

const resources: Resources = Object
  .entries(locales)
  .reduce((acc, [locale, translation]) => ({
    ...acc,
    [locale]: {
      [NAMESPACE]: translation
    }
  }), {})

export default resources
