const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Prepare for custom server
app.prepare().then(() => {
  const server = express()

  // ========================== / USER / ==========================

  // HOME
  server.get('/', (req, res) => app.render(req, res, '/', req.query))
  server.get('/login', (req, res) => app.render(req, res, '/login', req.query))
  // ABOUT
  server.get('/about', (req, res) => app.render(req, res, '/about', req.query))
  server.get('/about/:scope', (req, res) =>
    app.render(req, res, `/about/${req?.params?.scope}`, req.query)
  )
  // SERVICES
  server.get('/services', (req, res) => app.render(req, res, '/services', req.query))
  server.get('/services/:type', (req, res) =>
    app.render(req, res, `/services/${req?.params?.type}`, req.query)
  )
  // NEWS
  server.get('/news', (req, res) => app.render(req, res, '/news', req.query))
  server.get('/news/media', (req, res) => app.render(req, res, '/news/media', req.query))
  server.get('/news/media/:id', (req, res) =>
    app.render(req, res, `/news/media/${req?.params?.id}`, req.query)
  )
  server.get('/news/carreer', (req, res) => app.render(req, res, '/news/carreer', req.query))
  server.get('/news/carreer/:id', (req, res) =>
    app.render(req, res, `/news/carreer/${req?.params?.id}`, req.query)
  )
  // CONTACT
  server.get('/contact', (req, res) => app.render(req, res, '/contact', req.query))

  // ========================== / ADMIN / ==========================

  // DASHBOARD
  server.get('/admin', (req, res) => app.render(req, res, '/admin', req.query))
  server.get('/admin/dashboard', (req, res) => app.render(req, res, '/admin/dashboard', req.query))
  // HOME
  server.get('/admin/home/:section', (req, res) =>
    app.render(req, res, `/admin/home/${req?.params?.section}`, req.query)
  )
  // ABOUT
  server.get('/admin/about/:scope', (req, res) =>
    app.render(req, res, `/admin/about/${req?.query?.scope}`, req.query)
  )
  // NEWS
  server.get('/admin/news/:category', (req, res) =>
    app.render(req, res, `/admin/news/${req?.params?.category}`, req.query)
  )
  server.get('/admin/news/:category/edit/:id', (req, res) =>
    app.render(req, res, `/admin/news/${req?.params?.category}/edit/${req?.params?.id}`, req.query)
  )
  // SERVICES
  server.get('/admin/services/:type', (req, res) =>
    app.render(req, res, `/admin/services/${req?.params?.type}`, req.query)
  )
  server.get('/admin/services/:type/edit/:id', (req, res) =>
    app.render(req, res, `/admin/services/${req?.params?.type}/edit/${req?.params?.id}`, req.query)
  )
  // SETTINGS
  server.get('/admin/settings/:category', (req, res) =>
    app.render(req, res, `/admin/settings/${req?.params?.category}`, req.query)
  )

  // 404 NOT FOUND
  server.all('*', (req, res) => handle(req, res))

  server.listen(port, () => {
    console.info(`> Ready on http://localhost:${port}`)
  })
})
