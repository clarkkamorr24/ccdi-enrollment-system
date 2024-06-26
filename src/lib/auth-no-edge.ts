import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "./validation";
import { getUserByEmail } from "./server-utils";
import { nextAuthEdgeConfig } from "./auth-edge";

const config = {
  ...nextAuthEdgeConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        //validation
        const validatedFormData = loginSchema.safeParse(credentials);

        if (!validatedFormData.success) {
          return null;
        }
        //extract values
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);

        if (!user) {
          console.log("user not found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
