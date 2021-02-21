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
    ]
  },
}
