import { Meta } from '@/components/Meta'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <div className="max-w-3xl px-4 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
        <Nav />
        <main className="mt-4">{children}</main>
      </div>
      <Footer />
    </>
  )
}
