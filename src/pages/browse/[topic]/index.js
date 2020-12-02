import Link from "next/link";
import Image from "next/image";
import pluralize from "pluralize";

import { db } from "../../../data/db";
import { Nav } from "../../../components/Nav";
import { Section } from "../../../components/Section";

const Topic = ({ topic, categories }) => {
  const renderSets = (sets) => {
    if (!sets.length) {
      return (
        <p className="text-xl font-normal tracking-tight text-gray-500">
          No sets in this Topic.
        </p>
      );
    }

    const setsHTML = sets.map((set) => (
      <li key={set.id} className="p-6 bg-gray-800 shadow-lg rounded-3xl">
        <h2 className="text-2xl font-semibold leading-tight">{set.name}</h2>
        <p className="mb-4 text-sm font-medium text-gray-400 uppercase">
          {pluralize("term", set.numTerms, true)}
        </p>
        <p className="mb-8 font-medium">{set.description}</p>
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
      </li>
    ));

    return <ul className="text-white space-y-8"> {setsHTML} </ul>;
  };

  const renderCategories = topic.categories.map((category) => {
    return (
      <Section key={category.id}>
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          {category.name} Sets
        </h2>
        {renderSets(categories[category.id])}
      </Section>
    );
  });

  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="mt-10 mb-6">
          <div className="flex items-center mb-4 text-sm font-medium text-gray-700">
            <Link href="/">
              <a>
                <svg
                  className="w-4 h-4 mr-1 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </a>
            </Link>
            <span className="mx-1">/</span>
            <span className="mx-1">{topic.name}</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
            {topic.name}
          </h1>
          <p className="text-2xl font-normal tracking-tight text-gray-500">
            {topic.description}
          </p>
        </header>
        {renderCategories}
      </main>
      <footer></footer>
    </div>
  );
};

export default Topic;

export async function getStaticPaths() {
  return {
    paths: db.topics.DEFAULT.map((topic) => ({
      params: { topic: topic.slug },
    })),
    fallback: true,
  };
}

/*
 * Example return object:
 *
 * {
 *   props: {
 *     topic: {
 *       name: 'Math',
 *       categories: [
 *         { id: 'abse', name: 'Algebra' },
 *         { id: 'erb3', name: 'Geometry' },
 *       ]
 *     },
 *     categories: {
 *       'abse': [
 *         { name: 'My Basic Math', description: '', numTerms: 3 }
 *         { name: 'My Algebra', description: '', numTerms: 0 }
 *       ],
 *       'erb3': [
 *         { name: '', description: '', numTerms: 0 }
 *         { name: '', description: '', numTerms: 0 }
 *       ]
 *     }
 *   },
 *   revalidate: 1
 * }
 */
export async function getStaticProps({ params }) {
  const topic = db.topics.DEFAULT.find((topic) => topic.slug === params.topic);
  const categories = topic.categories.reduce((result, category) => {
    result[category.id] = db.sets
      .filter((set) => set.category === category.id)
      .map((set) => ({
        id: set.id,
        name: set.name,
        description: set.description,
        numTerms: set.cards.length,
      }));
    return result;
  }, {});
  return { props: { topic, categories }, revalidate: 1 };
}
