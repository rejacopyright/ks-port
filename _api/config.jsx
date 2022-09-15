let api = 'http://localhost/kss-api'
if (typeof window !== 'undefined') {
  if (window?.location?.hostname !== 'localhost') {
    api = 'https://api.krakatausamuderasolusi.co.id'
  }
}

export { api }
