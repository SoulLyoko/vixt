// @ts-nocheck
import { BrowserRouter, useRoutes } from 'react-router'
import appConfig from 'virtual:vixt:app-config'
import { setupLayouts } from 'virtual:vixt:setup-layouts'
import routes from '~react-pages'

function App() {
  const routesWithLayouts = setupLayouts(routes)
  const Routes = () => useRoutes(routesWithLayouts)
  return (
    <BrowserRouter basename={appConfig.baseURL}>
      <Routes />
    </BrowserRouter>
  )
}

export default App
