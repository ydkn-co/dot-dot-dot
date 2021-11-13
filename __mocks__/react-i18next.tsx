export const useTranslation = () => {
  return {
    i18n: {
      changeLanguage: () => new Promise(() => jest.fn())
    },
    t: (str) => str
  }
}
