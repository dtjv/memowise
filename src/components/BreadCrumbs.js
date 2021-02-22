import Link from 'next/link'

import { HomeIcon } from '@/components/icons/home'

export const BreadCrumbs = ({ crumbs }) => {
  const renderCrumbs = crumbs.map((crumb, idx) => (
    <div key={idx}>
      <div className="flex items-center">
        <span className="mx-1">/</span>
        {crumb.isLink ? (
          <Link href={crumb.path} className="leading-tight">
            <a>
              <span className="mx-1 text-blue-600">{crumb.name}</span>
            </a>
          </Link>
        ) : (
          <span className="mx-1 leading-tight">{crumb.name}</span>
        )}
      </div>
    </div>
  ))

  return renderCrumbs.length === 0 ? null : (
    <div className="flex items-center mb-4 text-sm font-medium text-gray-700">
      <Link href="/">
        <a aria-label="home page icon">
          <HomeIcon className="w-4 h-4 mr-1 text-blue-600" />
        </a>
      </Link>
      {renderCrumbs}
    </div>
  )
}
