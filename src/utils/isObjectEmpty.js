export const isObjectEmpty = (o) =>
  o && Object.keys(o).length === 0 && o.constructor === Object
