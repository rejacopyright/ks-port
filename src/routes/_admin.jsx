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
    ],
  },
]
export default router
