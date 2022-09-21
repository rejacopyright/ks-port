import { lazy, createElement } from 'react'
const router = [
  {
    path: 'admin/*',
    children: [
      // HOME
      {
        path: 'home/*',
        children: [
          {
            path: 'assets',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/home/assets'))),
          },
          {
            path: 'banner',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/home/banner'))),
          },
          {
            path: 'customer',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/home/customer'))),
          },
        ],
      },
      // ABOUT
      {
        path: 'about/:scope',
        index: true,
        element: createElement(lazy(() => import('@pages/admin/about/edit'))),
      },
      // NEWS
      {
        path: 'news/*',
        children: [
          {
            path: 'media',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/news/media'))),
          },
          {
            path: 'media/add',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/news/media/addEdit'))),
          },
          {
            path: 'media/edit/:id',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/news/media/addEdit'))),
          },
          {
            path: 'carreer',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/news/carreer'))),
          },
          {
            path: 'carreer/add',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/news/carreer/addEdit'))),
          },
          {
            path: 'carreer/edit/:id',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/news/carreer/addEdit'))),
          },
        ],
      },
      // SERVICES
      {
        path: 'services/*',
        children: [
          {
            path: ':type',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/services'))),
          },
          {
            path: ':type/add',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/services/addEdit'))),
          },
          {
            path: ':type/edit/:id',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/services/addEdit'))),
          },
        ],
      },
    ],
  },
]
export default router
