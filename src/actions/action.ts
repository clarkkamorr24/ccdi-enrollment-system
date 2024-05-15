"use server";

import prisma from "@/lib/db";
import { getTodayDate } from "@/utils/getTodayDate";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth-no-edge";
import { sleep } from "@/lib/utils";
import {
  authSchema,
  studentIdSchema,
  studentSchema,
  subjectIdSchema,
  subjectSchema,
} from "@/lib/validation";
import bcrypt from "bcryptjs";
import { Attendance, Prisma, Student, Subject } from "@prisma/client";
import { checkAuth, getSubjectById } from "@/lib/server-utils";

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
export async function getStudentById(id: string) {
  const student = await prisma.student.findUnique({
    where: {
      id: id,
    },
  });

  return student;
}

export async function getStudents(userId: string) {
  const students = await prisma.student.findMany({
    where: {
      userId: userId,
    },
  });

  return students;
}

export async function addStudent(student: unknown) {
  await sleep(1000);
  console.log("student", student);
  // authentication check
  const session = await checkAuth();

  // validation
  const validatedStudent = studentSchema.safeParse(student);
  if (!validatedStudent.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  //database mutation
  try {
    await prisma.student.create({
      data: {
        ...validatedStudent.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Student ID already exists.",
        };
      }
    }
    return {
      message: "Could not add student.",
    };
  }

  revalidatePath("/dashboard", "layout");
}

export async function deleteStudent(studentId: unknown) {
  // await sleep(1000);

  // authentication check
  const session = await checkAuth();

  // validation
  const validatedStudentId = studentIdSchema.safeParse(studentId);
  if (!validatedStudentId.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  //authorization to check the student Owner
  const student = await getStudentById(validatedStudentId.data);

  if (!student) {
    return {
      message: "Student not found.",
    };
  }

  if (student.userId !== session.user.id) {
    return {
      message: "Not authorized to delete this student.",
    };
  }

  //database mutation
  try {
    await prisma.student.delete({
      where: {
        id: validatedStudentId.data,
      },
      include: {
        attendance: true, // This ensures that the related attendance records are also considered in the transaction
      },
    });
  } catch (error) {
    return {
      message: "Could not delete student.",
    };
  }

  revalidatePath("/dashboard", "layout");
}

//attendance

export async function addAttendance(
  studentId: Student["id"],
  isPresent: boolean
) {
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

  revalidatePath("/dashboard", "layout");
}

export async function updateAttendance(
  attendanceId: Attendance["id"],
  isPresent: boolean
) {
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

  revalidatePath("/dashboard", "layout");
}

export async function geAttendanceByStudentId(studentId: Student["id"]) {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: studentId,
    },
  });

  return attendance;
}

export async function getAttendanceRecord(userId: string) {
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
export async function getSubjects(userId: Subject["userId"]) {
  const subjects = await prisma.subject.findMany({
    where: {
      userId: userId,
    },
  });

  return subjects;
}

export async function addSubject(subject: unknown) {
  await sleep(1000);

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

export async function deleteSubject(subjectId: unknown) {
  // await sleep(1000);

  // authentication check
  const session = await checkAuth();

  // validation
  const validatedSubjectId = subjectIdSchema.safeParse(subjectId);
  if (!validatedSubjectId.success) {
    return {
      message: "Invalid pet data.",
    };
  }

  //authorization to check the subject Owner
  const subject = await getSubjectById(validatedSubjectId.data);

  if (!subject) {
    return {
      message: "Pet not found.",
    };
  }

  if (subject.userId !== session.user.id) {
    return {
      message: "Not authorized to delete this pet.",
    };
  }

  //database mutation
  try {
    await prisma.subject.delete({
      where: {
        id: validatedSubjectId.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not delete subject.",
    };
  }

  revalidatePath("/dashboard/list-of-subjects");
}
