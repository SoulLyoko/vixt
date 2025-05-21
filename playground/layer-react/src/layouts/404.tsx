import { Outlet } from 'react-router'

function Layout404() {
  return (
    <div>
      <Outlet />
      <div>
        This layout should be overridden.
      </div>
    </div>
  )
}

export default Layout404
