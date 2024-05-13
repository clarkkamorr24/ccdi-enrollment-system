import { User } from "@prisma/client";
import "server-only";
import prisma from "@/lib/db";
import { auth } from "./auth-no-edge";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getUserByUsername(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
