import { Outlet } from 'react-router'

function SharedLayout(props: { name: string }) {
  return (
    <main px-4 py-10 text="center gray-700 dark:gray-200">
      <Outlet />
      <TheFooter />
      <div mt-5 text-sm opacity-50>
        {`[${props.name} Layout]`}
      </div>
    </main>
  )
}

export default SharedLayout
