import Link from "next/link";
import Image from "next/image";

const Section = ({ children }) => (
  <section className="py-8 sm:py-10">{children}</section>
);

const Sets = () => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <nav>
        <div className="flex items-center justify-between py-8 mb-12">
          <div>memowise</div>
          <div>menu</div>
        </div>
      </nav>
      <main>
        <Section>
          <h1 className="my-8 text-4xl font-extrabold tracking-tight text-gray-900 ">
            Math
          </h1>
        </Section>
        <Section>
          <div>
            <div className="p-6 shadow-lg rounded-md bg-gradient-to-br from-blue-100 to-blue-400">
              <h2 className="text-2xl font-semibold text-gray-900">Math 101</h2>
              <p className="mb-8 text-sm font-medium text-gray-500 uppercase">
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
            </div>
          </div>
        </Section>
      </main>
      <footer></footer>
    </div>
  );
};

export default Sets;
