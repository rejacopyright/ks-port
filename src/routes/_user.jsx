import { lazy, createElement } from 'react'
const router = [
  { index: true, element: createElement(lazy(() => import('@pages/home'))) },
  { path: 'login', index: true, element: createElement(lazy(() => import('@pages/auth/login'))) },
  {
    path: 'forgot-password',
    index: true,
    element: createElement(lazy(() => import('@pages/auth/forgotPassword'))),
  },
  {
    path: 'check-password',
    index: true,
    element: createElement(lazy(() => import('@pages/auth/checkPassword'))),
  },
  {
    path: 'reset-password',
    index: true,
    element: createElement(lazy(() => import('@pages/auth/resetPassword'))),
  },
  {
    path: 'success-password',
    index: true,
    element: createElement(lazy(() => import('@pages/auth/successPassword'))),
  },
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
  {
    path: 'terms-of-use',
    index: true,
    element: createElement(lazy(() => import('@pages/other/termOfUse'))),
  },
]
export default router
