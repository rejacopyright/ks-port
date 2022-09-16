const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Prepare for custom server
app.prepare().then(() => {
  const server = express()
  server.get('/', (req, res) => app.render(req, res, '/', req.query))
  server.get('/home', (req, res) => app.render(req, res, '/home', req.query))
  server.all('*', (req, res) => handle(req, res))

  server.listen(port, () => {
    console.info(`> Ready on http://localhost:${port}`)
  })
})
