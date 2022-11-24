import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { html } from "@/helpers/Email/template";
import nodemailer from "nodemailer";

export default NextAuth({
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
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          html: html({ url, host, email }),
        });
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/error",
    newUser: "/user/profile",
  },
  debug: true,
});
