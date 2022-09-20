import { lazy, createElement } from 'react'
const router = [
  { index: true, element: createElement(lazy(() => import('@pages/home'))) },
  {
    path: 'about/*',
    element: createElement(lazy(() => import('@pages/about'))),
    children: [{ path: ':scope', element: createElement(lazy(() => import('@pages/about'))) }],
  },
  {
    path: 'services/*',
    element: createElement(lazy(() => import('@pages/services'))),
    children: [{ path: ':scope', element: createElement(lazy(() => import('@pages/services'))) }],
  },
  {
    path: 'news/*',
    element: createElement(lazy(() => import('@pages/news/Provider'))),
    children: [
      {
        index: true,
        element: createElement(lazy(() => import('@pages/news/media'))),
      },
      {
        path: 'media',
        index: true,
        element: createElement(lazy(() => import('@pages/news/media'))),
      },
      {
        path: 'carreer',
        index: true,
        element: createElement(lazy(() => import('@pages/news/carreer'))),
      },
    ],
  },
  {
    path: 'news/media/:title',
    index: true,
    element: createElement(lazy(() => import('@pages/news/media/detail'))),
  },
  {
    path: 'news/carreer/:title',
    index: true,
    element: createElement(lazy(() => import('@pages/news/carreer/detail'))),
  },
  {
    path: 'contact',
    index: true,
    element: createElement(lazy(() => import('@pages/contact'))),
  },
]
export default router
