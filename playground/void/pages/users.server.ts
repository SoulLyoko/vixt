import type { InferProps } from 'void'

import { defineHandler } from 'void'

const users = [
  { id: '0', name: 'admin' },
  { id: '1', name: 'user1' },
  { id: '2', name: 'user2' },
]

export type Props = InferProps<typeof loader>

export const loader = defineHandler(async c => {
  const name = c.req.query('name')
  if (name) {
    return {
      users: users.filter(e => e.name.includes(name)),
      query: { name },
    }
  } else {
    return {
      users,
      query: {},
    }
  }
})
