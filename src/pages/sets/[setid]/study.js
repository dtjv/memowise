import { Nav } from '../../../components/Nav'

const Study = () => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <Nav />
      <main>
        <header className="mt-10 mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 ">
            Expression and Equations
          </h1>
        </header>
        <div>
          <div className="p-6 mb-8 shadow-sm ring-1 ring-black ring-opacity-5 rounded-xl">
            <p className="text-xs text-gray-500 uppercase">term</p>
            <div className="flex justify-center py-10">
              <p>Algebraic Expression</p>
            </div>
          </div>
          <ul className="space-y-4">
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
            <li className="px-4 py-4 shadow-sm ring-1 ring-blue-500 rounded-xl">
              Loreum ipsum orem ipsum dolor sit amet.
            </li>
          </ul>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}

export default Study
