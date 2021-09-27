export const transformObjectId = (_, o) => {
  if (!o.id) {
    delete o.id
  }

  if (o._id) {
    o.id = o._id.toString()
    delete o._id
  }

  return o
}
