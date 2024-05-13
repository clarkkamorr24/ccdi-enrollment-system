import { NextAuthConfig } from "next-auth";

export const nextAuthEdgeConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      console.log("auth", auth);
      console.log("request", request.nextUrl.pathname);
      return true;
    },

    jwt: ({ token, user }) => {
      if (user) {
        // on signin
        token.userId = user.id;
        token.email = user.username;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.userId as string;

      return session;
    },
  },
} satisfies NextAuthConfig;
