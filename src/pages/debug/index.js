import { Topic } from '@/models/Topic'
import { dump } from '@/utils/dump'
import { connectToDB } from '@/utils/connectToDB'
//import { transformObjectId } from '@/utils/transformObjectId'

const Demo = () => {
  return <h1>demo</h1>
}

export default Demo

export async function getStaticProps() {
  await connectToDB()

  const topics = await Topic.find({})
  /*
  const subTopics = topics
    .flatMap((topic) => topic.subTopics)
    .map((subTopic) => subTopic.slug)
  */

  const subTopics = topics.flatMap((topic) => {
    return topic.subTopics.map((subTopic) => {
      return {
        params: {
          topic: topic.slug,
          subtopic: subTopic.slug,
        },
      }
    })
  })

  dump(subTopics)

  return {
    props: { demo: 'demo' },
  }
}
