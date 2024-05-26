import "server-only";

import { User, Subject, Student } from "@prisma/client";
import prisma from "@/lib/db";
import { auth } from "./auth-no-edge";
import { redirect } from "next/navigation";
import crypto from "crypto";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function verifyToken(token: string) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findMany({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user.length) {
    redirect("/forgot-password");
  }

  return user;
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

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
