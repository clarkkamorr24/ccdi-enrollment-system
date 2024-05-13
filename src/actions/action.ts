"use server";

import prisma from "@/lib/db";
import { getTodayDate } from "@/utils/getTodayDate";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth-no-edge";
import { sleep } from "@/lib/utils";

export async function logIn(prevState: unknown, formData: unknown) {
  await sleep(1000);
  //check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  try {
    await signIn("credentials", {
      redirectTo: "/dashboard",
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
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

export async function logout() {
  await sleep(1000);

  await signOut({
    redirectTo: "/",
  });
}

export async function getStudent(id: any) {
  const student = await prisma.student.findUnique({
    where: {
      id: id,
    },
  });

  return student;
}

export async function getStudents() {
  const students = await prisma.student.findMany();

  return students;
}

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

export async function getAttendanceRecord() {
  const studentAttendance = await prisma.student.findMany({
    include: {
      attendance: true,
    },
  });

  return studentAttendance;
}
