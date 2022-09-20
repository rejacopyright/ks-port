import { lazy, createElement } from 'react'
import user from './_user'
import admin from './_admin'

const routes = [
  {
    path: '/*',
    element: createElement(lazy(() => import('@layouts/LayoutProvider'))),
    children: [...user, ...admin],
  },
  // 404
  {
    path: '*',
    index: true,
    element: createElement(lazy(() => import('@pages/pageNotFound'))),
  },
]

export default routes
