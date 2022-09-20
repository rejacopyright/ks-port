import { lazy, createElement } from 'react'
const router = [
  {
    path: 'admin/*',
    element: createElement(lazy(() => import('@pages/admin'))),
    children: [
      {
        path: 'home/*',
        children: [
          {
            path: 'banner',
            index: true,
            element: createElement(lazy(() => import('@pages/admin/home/banner'))),
          },
        ],
      },
    ],
  },
  // 404
  {
    path: '*',
    index: true,
    element: createElement(lazy(() => import('@pages/pageNotFound'))),
  },
]
export default router
