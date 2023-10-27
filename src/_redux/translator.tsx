interface CacheProvider {
  get: (language: string, key: string) => string | undefined
  set: (language: string, key: string, translation: string) => void
}

// example procider
export const cacheProvider: CacheProvider = {
  get: (language, key) =>
    ((JSON.parse(localStorage.getItem('translations')!) || {})[key] || {})[language],
  set: (language, key, value) => {
    const existing = JSON.parse(localStorage.getItem('translations')!) || {
      [key]: {},
    }
    existing[key] = { ...existing[key], [language]: value }
    localStorage.setItem('translations', JSON.stringify(existing))
  },
}
