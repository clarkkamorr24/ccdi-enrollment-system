import "server-only";

import { User, Subject } from "@prisma/client";
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

export async function getSubjectById(subjectId: Subject["id"]) {
  const subject = await prisma.subject.findUnique({
    where: {
      id: subjectId,
    },
    select: {
      userId: true,
    },
  });

  return subject;
}

export async function getUserByUsername(username: User["username"]) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}
