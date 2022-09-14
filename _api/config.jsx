let api = 'http://localhost/kss-api'
if (typeof window !== 'undefined') {
  console.log(window?.location)
  if (window?.location?.hostname !== 'localhost') {
    api = 'https://api.krakatausamuderasolusi.co.id'
  }
}

export { api }
