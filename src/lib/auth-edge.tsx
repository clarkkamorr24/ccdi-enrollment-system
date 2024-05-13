import { NextAuthConfig } from "next-auth";

export const nextAuthEdgeConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      console.log("auth", auth);
      const isOnDashboard = request.nextUrl.pathname.includes("/dashboard");
      console.log("isOnDashboard", isOnDashboard);

      // if (isOnDashboard) {
      //   return false;
      // }

      return true;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        // on signin
        token.userId = user.id;
        token.email = user.email;
      }
      console.log("return token", token);
      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.userId as string;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
