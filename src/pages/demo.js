const Section = ({ children }) => (
  <section className="py-8 bg-gray-400 sm:py-10">{children}</section>
);

const Demo = () => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased bg-gray-800 sm:px-8 md:px-12 lg:px-0">
      <nav>
        <div className="flex items-center justify-between py-8 bg-gray-200">
          <div>memowise</div>
          <div>menu</div>
        </div>
      </nav>
      <main>
        <header>
          <h1>memowise</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button>Start Learning</button>
          <div>
            <img src="https://picsum.photos/id/1000/500" />
          </div>
        </header>
        <Section>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            ></path>
          </svg>
          <h2>Feature AAA</h2>
          <p>Lorem ipsum dolor sit amet, consectetur.</p>
          <p>
            Eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </p>
          <a href="">Learn More</a>
          <div>
            <img src="https://picsum.photos/id/1000/500" />
          </div>
        </Section>
      </main>
      <footer></footer>
    </div>
  );
};

export default Demo;
