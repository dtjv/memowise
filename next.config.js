module.exports = {
  async redirects() {
    return [
      {
        source: '/browse',
        destination: '/',
        permanent: true,
      },
      {
        source: '/sets',
        destination: '/',
        permanent: true,
      },
      {
        source: '/users',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
