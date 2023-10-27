const remote: boolean = false
let api = remote ? 'https://api.krakatausamuderasolusi.co.id' : 'http://localhost/kss-api'
if (typeof window !== 'undefined') {
  if (window?.location?.hostname !== 'localhost' || remote) {
    api = 'https://api.krakatausamuderasolusi.co.id'
  }
}

export { api }
