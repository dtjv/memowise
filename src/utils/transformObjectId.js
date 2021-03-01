export const transformObjectId = (_, ret) => {
  if (ret._id) {
    ret.id = ret._id.toString()
    delete ret._id
  }
  return ret
}
