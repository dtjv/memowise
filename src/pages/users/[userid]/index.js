import Link from "next/link";
import Image from "next/image";
import pluralize from "pluralize";

import { db } from "../../../data/db";
import { Nav } from "../../../components/Nav";
import { Section } from "../../../components/Section";

const UserDashboard = ({ user, sets }) => {
  const renderSets = () => (
    <ul className="text-white space-y-8">
      {sets.map((set) => (
        <li key={set.id} className="p-6 bg-gray-800 shadow-lg rounded-3xl">
          <h2 className="text-2xl font-semibold leading-tight">{set.name}</h2>
          <p className="mb-4 text-sm font-medium text-gray-400 uppercase">
            {pluralize("term", set.cards.length, true)}
          </p>
          <p className="mb-8 font-medium">{set.description}</p>
          <Link href={`/sets/${set.id}`}>
            <a className="inline-flex items-center px-4 py-2 font-semibold rounded-lg ring-1 ring-white">
              Study
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="mt-10 mb-6">
          <div className="flex items-center">
            <Image
              src="/me.jpg"
              alt="a pic of me"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-4xl font-extrabold">{user.name}</p>
              <p className="text-base font-medium text-gray-500">
                @{user.userid}
              </p>
            </div>
          </div>
        </header>
        {sets.length ? <Section> {renderSets()} </Section> : null}
      </main>
      <footer></footer>
    </div>
  );
};

export default UserDashboard;

export async function getStaticPaths() {
  return {
    paths: db.users.map((user) => ({ params: { userid: user.userid } })),
    fallback: true,
  };
}

/*
 * Example of return object:
 *
 * {
 *   props: {
 *     user: {
 *       userid: '...',
 *       name: '...',
 *       sets: ['adfw', ...]
 *     },
 *     sets: [
 *       {
 *         id: 'adfw',
 *         name: 'My Basic Math',
 *         topicId: 'xx1m',
 *         categoryId: 'abse',
 *         ...
 *         topic: {
 *           id: 'xx1m',
 *           name: '...',
 *           ...
 *           categories: [
 *             { id: 'abse', name: '...' },
 *             ...
 *           ]
 *         }
 *       }
 *     ]
 *   }
 * }
 */
export async function getStaticProps({ params }) {
  const user = db.users.find((user) => user.userid === params.userid);
  const sets = user.sets
    .map((setId) => db.sets.find((set) => set.id === setId))
    .map((set) => {
      const topic = db.topics.find((topic) => topic.id === set.topicId);
      return {
        ...set,
        topic,
      };
    });
  return { props: { user, sets }, revalidate: 1 };
}
