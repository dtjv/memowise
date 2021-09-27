export const registerTransformers =
  (transformers = []) =>
  (_, ret) => {
    for (const transformer of transformers) {
      transformer(_, ret)
    }

    return ret
  }
