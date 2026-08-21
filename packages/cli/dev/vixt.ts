import { createJiti } from 'jiti'

const { runMain } = await createJiti(import.meta.url).import<typeof import('../src')>('../src')

runMain()
