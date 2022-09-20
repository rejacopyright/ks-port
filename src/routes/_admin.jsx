import { lazy, createElement } from 'react'
const router = [
  {
    path: 'admin/*',
    element: createElement(lazy(() => import('@pages/admin/home/assets'))),
  },
]
export default router
