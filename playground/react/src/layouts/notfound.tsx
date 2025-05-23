import { Outlet } from 'react-router'

function Layout404() {
  const navigate = useNavigate()
  return (
    <main p="x4 y10" text="center teal-700 dark:gray-200">
      <div text-4xl>
        <Icon icon="carbon:warning" inline-block />
      </div>
      <Outlet />
      <div>
        <button className="btn" text-sm m="3 t8" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </main>
  )
}

export default Layout404
