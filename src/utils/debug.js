import { inspect } from 'util'

export const dump = (o, msg) => {
  console.info(inspect(o, { depth: 6, color: true }), msg)
}
