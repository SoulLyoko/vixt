// @ts-expect-error virtual file
import routes from '~react-pages'
import { createElement } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
// @ts-expect-error virtual file
import appConfig from 'virtual:vixt:app-config'
// @ts-expect-error virtual file
import { setupLayouts } from 'virtual:vixt:setup-layouts'

function App() {
  const router = createBrowserRouter(setupLayouts(routes), { basename: appConfig.baseURL })
  return createElement(RouterProvider, { router })
}

export default App
