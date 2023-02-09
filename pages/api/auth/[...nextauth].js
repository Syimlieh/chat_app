import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import { hashCompare } from "@/helpers/hashing";
import { Users } from "@/model";

export default NextAuth({
  site: process.env.NEXTAUTH_URL,
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET_KEY,
  session: {
    strategy: "jwt", // || "database"
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        await dbConnect().catch((error) => {
          error: "Connection Failed...!";
        });
        let user = await Users.findOne({ email: credentials.email });
        if (!user) {
          throw new Error(
            "Couldn't find User " + credentials.email + "please Register First"
          );
        }
        const checkedHash = hashCompare(credentials.password, user.password);
        if (!checkedHash || user.email !== credentials.email) {
          throw new Error("User and password is incorrect");
        }
        return user;
      },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, account, profile }) {
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },

  pages: {
    signIn: "/auth/signin",
    error: "/error",
    newUser: "/user/profile",
  },
  debug: true,
});
