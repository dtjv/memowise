import { Meta } from '@/components/Meta'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col items-stretch min-h-full">
        <div className="flex-grow max-w-3xl px-4 antialiased sm:px-8 md:px-12 lg:px-0">
          <Nav />
          <main className="mt-4">{children}</main>
        </div>
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    </>
  )
}
