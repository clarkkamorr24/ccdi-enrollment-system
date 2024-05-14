"use server";

import prisma from "@/lib/db";
import { getTodayDate } from "@/utils/getTodayDate";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth-no-edge";
import { sleep } from "@/lib/utils";
import { authSchema, subjectSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { checkAuth } from "@/lib/server-utils";

//login
export async function logIn(prevState: unknown, formData: unknown) {
  await sleep(1000);
  //check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      const { type } = error;
      switch (type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials.",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }

    throw error;
  }
}

//signup
export async function register(prevState: unknown, formData: unknown) {
  await sleep(1000);
  //check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  //convert formData to plain object
  const formDataObject = Object.fromEntries(formData.entries());

  //validation
  const validatedFormData = authSchema.safeParse(formDataObject);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { username, password } = validatedFormData.data;
  console.log("username", username);
  console.log("password", password);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Username already exists.",
        };
      }
    }
    return {
      message: "Could not sign up.",
    };
  }

  await signIn("credentials", formData);
}

//logout
export async function logout() {
  await sleep(1000);

  await signOut({
    redirectTo: "/",
  });
}

//students
export async function getStudent(id: any) {
  const student = await prisma.student.findUnique({
    where: {
      id: id,
    },
  });

  return student;
}

export async function getStudents(userId: any) {
  const students = await prisma.student.findMany({
    where: {
      userId: userId,
    },
  });

  return students;
}

//attendance
export async function addAttendance(studentId: any, isPresent: any) {
  const todayDate = getTodayDate();

  try {
    await prisma.attendance.create({
      data: {
        present: isPresent,
        createdAt: todayDate,
        updatedAt: todayDate,
        student: {
          connect: {
            id: studentId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not add attendance",
    };
  }

  revalidatePath("/dashboard/attendance");
}

export async function updateAttendance(attendanceId: any, isPresent: any) {
  const todayDate = getTodayDate();

  try {
    await prisma.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        updatedAt: todayDate,
        present: isPresent,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not update attendance",
    };
  }

  revalidatePath("/dashboard/attendance");
}

export async function geAttendanceByStudentId(studentId: any) {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: studentId,
    },
  });

  return attendance;
}

export async function getAttendanceRecord(userId: any) {
  const studentAttendance = await prisma.student.findMany({
    where: {
      userId: userId,
    },
    include: {
      attendance: true,
    },
  });

  return studentAttendance;
}

//subjects
export async function getSubjects(userId: any) {
  const subjects = await prisma.subject.findMany({
    where: {
      userId: userId,
    },
  });

  return subjects;
}

export async function addSubject(subject: unknown) {
  // await sleep(1000);

  // authentication check
  const session = await checkAuth();

  // validation
  const validatedSubject = subjectSchema.safeParse(subject);
  if (!validatedSubject.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  //database mutation
  try {
    await prisma.subject.create({
      data: {
        ...validatedSubject.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Could not add subject.",
    };
  }

  revalidatePath("/dashboard/list-of-subjects");
}
