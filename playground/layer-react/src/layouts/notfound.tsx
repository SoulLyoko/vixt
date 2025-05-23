import { Outlet } from 'react-router'

function LayoutNotfound() {
  return (
    <div>
      <Outlet />
      <div>
        This layout should be overridden.
      </div>
    </div>
  )
}

export default LayoutNotfound
