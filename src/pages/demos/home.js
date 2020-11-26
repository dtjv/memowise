import Link from "next/link";

const Section = ({ children }) => (
  <section className="py-8 sm:py-10">{children}</section>
);

const Home = () => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <nav>
        <div className="flex items-center justify-between py-8 mb-12">
          <div>memowise</div>
          <div>menu</div>
        </div>
      </nav>
      <main>
        <header className="mb-14">
          <div className="flex items-center">
            <svg
              className="w-12 h-12 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              ></path>
            </svg>
            <p className="text-3xl font-semibold text-gray-900">memowise</p>
          </div>
          <h1 className="my-8 text-4xl font-extrabold tracking-tight text-gray-900 ">
            Learn all the things with a modern approach to a proven technique.
          </h1>
          <p className="mb-10 text-lg font-medium text-gray-500">
            A lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link href="/">
            <a className="inline-flex items-center px-6 py-3 text-lg font-semibold border border-transparent border-gray-900 leading-6 rounded-md">
              Start Learning
            </a>
          </Link>
        </header>
        <Section>
          <h2 className="mb-3 text-lg font-semibold leading-snug text-purple-600 uppercase">
            Algorithm Based
          </h2>
          <p className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
          <p className="text-lg font-medium text-gray-500">
            Eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </p>
          <Link href="/">
            <a className="text-lg font-medium text-purple-600 hover:text-purple-800">
              {" "}
              Learn more -{">"}
            </a>
          </Link>
        </Section>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
