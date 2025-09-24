import en from './locales/en.json'
import zh from './locales/zh.json'
import es from './locales/es.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    zh,
    es
  }
}))