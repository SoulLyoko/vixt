import routes from '~react-pages'
import { StrictMode, Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router'
// @ts-expect-error virtual file
import { setupLayouts } from 'virtual:vixt:setup-layouts'

export default function () {
  const layouts = setupLayouts(routes)
  const Routes = () => useRoutes(layouts)
  return (
    <StrictMode>
      <Suspense fallback="Loading...">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  )
}
