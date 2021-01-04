import { Container } from './Container'
import { features } from '../data/features'

export const Features = () => {
  const renderFeatures = features.map((feature, idx) => (
    <Container key={idx}>
      <h2 className="mb-2 text-lg font-semibold leading-snug text-blue-600 uppercase">
        {feature.label}
      </h2>
      <p className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900">
        {feature.header}
      </p>
      <div className="text-lg font-medium text-gray-500 space-y-4">
        {feature.summary.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      {/*
          <Link href="/">
            <a className="text-lg font-medium text-blue-600">
              Learn more -{'>'}
            </a>
          </Link>
          */}
    </Container>
  ))

  return <>{renderFeatures}</>
}
