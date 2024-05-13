import { NextAuthConfig } from "next-auth";

export const nextAuthEdgeConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      return true;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        // on signin
        token.userId = user.id;
        token.email = user.email;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.userId as string;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
