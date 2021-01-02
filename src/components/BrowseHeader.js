export const BrowseHeader = ({ name, description }) => {
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold text-gray-900">{name}</h1>
      <p className="text-2xl font-normal tracking-tight text-gray-500">
        {description}
      </p>
    </>
  )
}
