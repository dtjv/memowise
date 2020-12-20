export const transformObjectId = (_, ret) => {
  ret.id = ret._id.toString()
  delete ret._id
  return ret
}
