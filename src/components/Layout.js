import { Meta } from '@/components/Meta'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col items-stretch min-h-full antialiased">
        <div className="flex-grow px-4 sm:px-8 md:px-24 lg:px-36 xl:px-52">
          <Nav />
          <main className="my-4">{children}</main>
        </div>
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    </>
  )
}
