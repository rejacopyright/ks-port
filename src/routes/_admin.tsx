import { lazy } from 'react'
const router: any = [
  {
    path: 'admin/*',
    children: [
      // DASHBOARD
      {
        index: true,
        element: lazy(() => import('@pages/admin/dashboard')),
      },
      // HOME
      {
        path: 'home/*',
        children: [
          {
            path: 'popup',
            index: true,
            element: lazy(() => import('@pages/admin/home/popup')),
          },
          {
            path: 'assets',
            index: true,
            element: lazy(() => import('@pages/admin/home/assets')),
          },
          {
            path: 'banner',
            index: true,
            element: lazy(() => import('@pages/admin/home/banner')),
          },
          {
            path: 'customer',
            index: true,
            element: lazy(() => import('@pages/admin/home/customer')),
          },
        ],
      },
      // BANNER
      {
        path: 'banner',
        index: true,
        element: lazy(() => import('@pages/admin/banner')),
      },
      // ABOUT
      {
        path: 'about/:scope',
        index: true,
        element: lazy(() => import('@pages/admin/about/edit')),
      },
      // NEWS
      {
        path: 'news/*',
        children: [
          {
            path: 'media',
            index: true,
            element: lazy(() => import('@pages/admin/news/media')),
          },
          {
            path: 'media/add',
            index: true,
            element: lazy(() => import('@pages/admin/news/media/addEdit')),
          },
          {
            path: 'media/edit/:id',
            index: true,
            element: lazy(() => import('@pages/admin/news/media/addEdit')),
          },
          {
            path: 'carreer',
            index: true,
            element: lazy(() => import('@pages/admin/news/carreer')),
          },
          {
            path: 'carreer/add',
            index: true,
            element: lazy(() => import('@pages/admin/news/carreer/addEdit')),
          },
          {
            path: 'carreer/edit/:id',
            index: true,
            element: lazy(() => import('@pages/admin/news/carreer/addEdit')),
          },
        ],
      },
      // SERVICES
      {
        path: 'services/*',
        children: [
          {
            path: 'how-to-order',
            index: true,
            element: lazy(() => import('@pages/admin/services/howToOrder')),
          },
          {
            path: ':type',
            index: true,
            element: lazy(() => import('@pages/admin/services')),
          },
          {
            path: ':type/add',
            index: true,
            element: lazy(() => import('@pages/admin/services/addEdit')),
          },
          {
            path: ':type/edit/:id',
            index: true,
            element: lazy(() => import('@pages/admin/services/addEdit')),
          },
        ],
      },
      // SETTINGS
      {
        path: 'settings/*',
        children: [
          {
            path: 'contact',
            index: true,
            element: lazy(() => import('@pages/admin/settings/contact')),
          },
          {
            path: 'social',
            index: true,
            element: lazy(() => import('@pages/admin/settings/social')),
          },
        ],
      },
      // USERS
      {
        path: 'users',
        index: true,
        element: lazy(() => import('@pages/admin/users')),
      },
    ],
  },
]
export default router
