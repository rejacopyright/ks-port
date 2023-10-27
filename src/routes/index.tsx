import LayoutProvider from '@layouts/LayoutProvider'
import PageNotFound from '@pages/pageNotFound'
import { isValidElement } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import admin from './_admin'
import { Element } from './_element'
import user from './_user'

const mapper: any = (el: any) => {
  return el?.map((m: any) => {
    if (m?.element && !isValidElement(m?.element)) {
      m.element = <Element el={m.element} />
    }
    return m
  })
}

const routesMapper: any = (moduleRoutes: any) =>
  moduleRoutes?.map((level1: any) => {
    if (level1?.element && !isValidElement(level1?.element)) {
      level1.element = <Element el={level1.element} />
    }
    if (level1?.children) {
      level1.children = mapper(level1?.children)?.map((level2: any) => {
        if (level2?.children) {
          level2.children = mapper(level2.children)
          level2 = {
            ...level2,
            children: [
              ...level2?.children?.filter(({ path }: any) => path !== '*'),
              { path: '*', element: <PageNotFound /> },
            ],
          }
        }
        return level2
      })
      level1 = {
        ...level1,
        children: [
          ...level1?.children?.filter(({ path }: any) => path !== '*'),
          { path: '*', element: <PageNotFound /> },
        ],
      }
    }
    return level1
  })

const routes = [
  {
    path: '/*',
    element: <LayoutProvider />,
    children: [...routesMapper(user), ...routesMapper(admin)],
  },
  // 404
  {
    path: '*',
    index: true,
    element: <PageNotFound />,
  },
]

const BrowserRouter: any = () => {
  const router: any = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export { BrowserRouter }
