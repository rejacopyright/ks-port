import { lazy, createElement } from 'react'
const router = [
  {
    path: 'admin/*',
    children: [
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
    ],
  },
]
export default router
