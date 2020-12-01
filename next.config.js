module.exports = {
  async redirects() {
    return [
      {
        source: "/browse",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
