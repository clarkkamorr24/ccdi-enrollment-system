import "server-only";

import { User } from "@prisma/client";
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

export async function checkDashboardAuth() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return session;
}

export async function getUserByUsername(username: User["username"]) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}
