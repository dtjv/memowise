import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.DB_URI,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    encryption: true,
  },
  pages: {},
  callbacks: {
    async redirect(_, baseUrl) {
      return baseUrl
    },
    // on signin, jwt called before session callback, and user.id is from db!
    async jwt(token, user) {
      if (user?.id) {
        token.userId = user.id
      }
      return token
    },
    async session(session, token) {
      if (token?.userId) {
        session.user.id = token.userId
      }
      return session
    },
  },
  events: {},
  debug: false,
})
