import { lazy, createElement } from 'react'
const router = [
  { index: true, element: createElement(lazy(() => import('@pages/home'))) },
  {
    path: 'about/*',
    element: createElement(lazy(() => import('@pages/about'))),
    children: [{ path: ':scope', element: createElement(lazy(() => import('@pages/about'))) }],
  },
  {
    path: 'services',
    index: true,
    element: createElement(lazy(() => import('@pages/services'))),
  },
  {
    path: 'news',
    index: true,
    element: createElement(lazy(() => import('@pages/news'))),
  },
]
export default router
