import { useEffect, useState } from 'react'

const SkeletonText = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-6 bg-blue-400 rounded"> </div>
    </div>
  )
}

const Demo = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <div className="p-10 bg-gray-200">
      {isLoading ? (
        <SkeletonText />
      ) : (
        <p className="bg-blue-400 rounded"> demo </p>
      )}
    </div>
  )
}

export default Demo

/*
export async function getStaticProps() {
  await connectToDB()

  const topics = await Topic.find({})

  dump(topics)

  return {
    props: { demo: 'demo' },
  }
}
*/
