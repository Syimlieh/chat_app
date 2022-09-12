import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { setCookie } from "cookies-next";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  path: "/",
  expires: new Date(Date.now() * 60 * 60 * 24),
};
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  jwt: {
    encryption: true,
  },
  secret: process.env.JWT_SECCRET_KEY,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      setCookie("chatAppToken", token.accessToken, options);
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
