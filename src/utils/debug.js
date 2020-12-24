import { inspect } from 'util'

export const dump = (o) => {
  console.info(inspect(o, { depth: 6, color: true }))
}
