module.exports = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/users',
        destination: '/',
        permanent: true,
      },
      {
        source: '/decks',
        destination: '/browse',
        permanent: true,
      },
    ]
  },
}
