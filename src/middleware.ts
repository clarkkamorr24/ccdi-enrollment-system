import NextAuth from "next-auth";
import { nextAuthEdgeConfig } from "./lib/auth-edge";

// export function middleware(request: Request) {
//   console.log(request.url);
//   return NextResponse.next();
// }

export default NextAuth(nextAuthEdgeConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
