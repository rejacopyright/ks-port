// ========= EDIT IN package.json =========
// "dev": "node server.js",
// "start": "NODE_ENV=production node server.js",

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/') {
        await app.render(req, res, '/', query)
      } else if (pathname === '/about') {
        await app.render(req, res, '/about', query)
      } else if (pathname === '/business') {
        await app.render(req, res, '/business', query)
      } else if (pathname === '/customer') {
        await app.render(req, res, '/customer', query)
      } else if (pathname === '/gcg') {
        await app.render(req, res, '/gcg', query)
      } else if (pathname === '/news') {
        await app.render(req, res, '/news', query)
      } else if (pathname === '/csr') {
        await app.render(req, res, '/csr', query)
      } else if (pathname === '/vendor') {
        await app.render(req, res, '/vendor', query)
      } else if (pathname === '/employee') {
        await app.render(req, res, '/employee', query)
      } else if (pathname === '/contact') {
        await app.render(req, res, '/contact', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on https://${hostname}:${port}`)
  })
})
