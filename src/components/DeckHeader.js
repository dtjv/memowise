// import Image from 'next/image'
export const DeckHeader = ({ deck }) => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
        {deck.name}
      </h1>
      <p className="mb-4 text-xl font-normal tracking-tight text-gray-500">
        {deck.description}
      </p>
      {/*
      <div className="flex items-center">
        <Image
          src="/me.jpg"
          alt="a pic of me"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="ml-3 font-semibold">David Valles</p>
      </div>
      */}
    </>
  )
}
