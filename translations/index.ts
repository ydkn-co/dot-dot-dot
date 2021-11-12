import en from './en.json'

const NAMESPACE = 'translation'

const locales = {
  en
}

export interface Translation {
  game: {
    controlButtonText: {
      pause: string;
      play: string;
    }
    statusDescription: {
      new: string;
      paused: string;
      playing: string;
    }
  }
}

type NamespacedTranslation = Record<string, Translation>

type Resources = Record<string, NamespacedTranslation>;

const resources: Resources = Object
  .entries(locales)
  .reduce((acc, [locale, translation]) => ({
    ...acc,
    [locale]: {
      [NAMESPACE]: translation as Translation
    }
  }), {})

export default resources
