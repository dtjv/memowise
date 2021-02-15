import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    /*
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    */
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  //  database: process.env.DB_URI,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    encryption: true,
  },
  pages: {},
  callbacks: {
    // ensure user stays on same page when signing in or out.
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  events: {},
  debug: false,
})
