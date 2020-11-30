import Link from "next/link";
import Image from "next/image";

const Section = ({ children }) => (
  <section className="py-8 sm:py-10">{children}</section>
);

const Math = () => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <nav>
        <div className="flex items-center justify-between py-6 border-b border-gray-200">
          <div>memowise</div>
          <div>menu</div>
        </div>
      </nav>
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
            <span className="mx-1">Math</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 ">Math</h1>
          <p className="text-2xl font-normal tracking-tight text-gray-500">
            Eiusmod tempor incididunt labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do.
          </p>
        </header>
        <Section>
          <div className="flex items-baseline justify-between">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Algebra Sets
            </h2>
            <Link href="/">
              <a className="font-medium text-blue-500">View all -{">"}</a>
            </Link>
          </div>
          <ul className="text-white space-y-8">
            <li className="p-6 bg-gray-800 shadow-lg rounded-3xl">
              <h2 className="text-2xl font-semibold leading-tight">Math 101</h2>
              <p className="mb-4 text-sm font-medium text-gray-400 uppercase">
                35 terms
              </p>
              <p className="mb-8 font-medium">
                A few basic questions about pre-algebra. You should know this
                inside and out. These terms cover all you need to get into high
                school calculus.
              </p>
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
            <li className="p-6 bg-gray-800 shadow-lg rounded-3xl">
              <h2 className="text-2xl font-semibold leading-tight">
                Middle Grade Math and Pre-Algebra
              </h2>
              <p className="mb-4 text-sm font-medium text-gray-400 uppercase">
                35 terms
              </p>
              <p className="mb-8 font-medium">
                A few basic questions about pre-algebra. You should know this
                inside and out.
              </p>
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
          </ul>
        </Section>
      </main>
      <footer></footer>
    </div>
  );
};

export default Math;
