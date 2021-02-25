import { Container } from './Container'
import { features } from '../data/features'

export const Features = () => {
  const renderFeatures = features.map((feature, idx) => (
    <Container key={idx}>
      <p className="mb-2 text-lg font-semibold leading-snug text-blue-600 uppercase">
        {feature.label}
      </p>
      <p className="mb-6 text-3xl font-bold tracking-tight text-gray-900">
        {feature.header}
      </p>
      <div className="text-lg font-medium text-gray-500 space-y-4">
        {feature.summary.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </Container>
  ))

  return <>{renderFeatures}</>
}
