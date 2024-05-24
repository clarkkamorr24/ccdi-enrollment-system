import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "@/auth/core/jwt" {
  interface JWT {
    userId: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
  }
}
