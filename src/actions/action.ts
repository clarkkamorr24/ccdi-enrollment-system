"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth-no-edge";
import { sleep } from "@/lib/utils";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

import {
  emailSchema,
  registerSchema,
  resetPasswordSchema,
  studentIdSchema,
  studentSchema,
  subjectIdSchema,
  subjectSchema,
} from "@/lib/validation";
import bcrypt from "bcryptjs";
import { Attendance, Prisma, Student, Subject } from "@prisma/client";
import { checkAuth, getSubjectById, verifyToken } from "@/lib/server-utils";
import { Status } from "@/types/status";

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
  const validatedFormData = registerSchema.safeParse(formDataObject);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password, firstName, middleName, lastName } =
    validatedFormData.data;
  console.log("email", email);
  console.log("password", password);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists.",
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

export async function forgotPassword(prevState: unknown, formData: unknown) {
  await sleep(1000);

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  //convert formData to plain object
  const formDataObject = Object.fromEntries(formData.entries());
  //validation
  const validatedFormData = emailSchema.safeParse(formDataObject.email);

  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { data: email } = validatedFormData;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      message: "Email not found",
    };
  }

  if (user.resetToken) {
    return {
      message: "You have already requested to reset your password",
    };
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = new Date(Date.now() + 3600000);

  user.resetToken = passwordResetToken;
  user.resetTokenExpiry = passwordResetExpires;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken: passwordResetToken,
      resetTokenExpiry: passwordResetExpires,
    },
  });

  const resetUrl = `localhost:3000/reset-password/${resetToken}`;

  const msg = {
    to: email,
    from: "legazpiccdi@gmail.com",
    subject: "PASSWORD RESET LINK",
    html: `
      <p>Hi ${user.firstName} ${user.middleName} ${user.lastName},</p>
      <p>You have requested to reset your password. Click or copy the link below to reset your password.</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request to reset your password, please ignore this email.</p>
    `,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  try {
    await sgMail.send(msg);

    return {
      success: "Password reset email sent. Kindly check your email",
    };
  } catch (error) {
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return {
      message: "Could not send password reset email",
    };
  }
}

export async function resetPassword(formData: unknown, id: string) {
  await sleep(1000);

  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  //convert formData to plain object
  const formDataObject = Object.fromEntries(formData.entries());

  if (formDataObject.password !== formDataObject.confirmPassword) {
    return {
      message: "Password does not match",
    };
  }

  const validatedFormData = resetPasswordSchema.safeParse(formDataObject);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        hashedPassword: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    return {
      success: "Password reset successful",
    };
  } catch (error) {
    return {
      message: "Could not reset password",
    };
  }
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
    orderBy: {
      lastName: "asc",
    },
  });

  return students;
}

export async function addStudent(student: unknown) {
  await sleep(1000);
  // authentication check
  const session = await checkAuth();

  // validation
  const validatedStudent = studentSchema.safeParse(student);
  if (!validatedStudent.success) {
    return {
      message: "Invalid student data.",
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
          message: "ID Number already exists.",
        };
      }
    }
    return {
      message: "Could not add student.",
    };
  }

  revalidatePath("/dashboard", "layout");
}

export async function updateStudent(id: string, newStudent: unknown) {
  await sleep(1000);

  // authentication check
  const session = await checkAuth();

  // validation
  const validatedStudentId = studentIdSchema.safeParse(id);
  const validatedStudent = studentSchema.safeParse(newStudent);
  if (!validatedStudentId.success || !validatedStudent.success) {
    return {
      message: "Invalid student data.",
    };
  }

  const student = await getStudentById(id);

  if (!student) {
    return {
      message: "Student not found.",
    };
  }

  if (student.userId !== session.user.id) {
    return {
      message: "Not authorized to update this student.",
    };
  }
  //database mutation
  try {
    await prisma.student.update({
      where: {
        id: validatedStudentId.data,
      },
      data: validatedStudent.data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "ID Number already exists.",
        };
      }
    }
    return {
      message: "Could not update student.",
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
      message: "Invalid student data.",
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
    });
  } catch (error) {
    return {
      message: "Could not delete student.",
    };
  }

  revalidatePath("/dashboard/attendance-weekly-record");
}

//attendance

export async function addAttendance(
  studentId: Student["id"],
  status: Status,
  date: string
) {
  try {
    await prisma.attendance.create({
      data: {
        status: status,
        createdAt: date,
        updatedAt: date,
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
  status: Status,
  date: string
) {
  try {
    await prisma.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        updatedAt: date,
        status: status,
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
    orderBy: {
      lastName: "asc",
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
      message: "Invalid subject data.",
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

  revalidatePath("/dashboard", "layout");
}

export async function updateSubject(id: string, newSubject: unknown) {
  await sleep(1000);

  // authentication check
  const session = await checkAuth();

  // validation
  const validatedSubjectId = subjectIdSchema.safeParse(id);
  const validatedSubject = subjectSchema.safeParse(newSubject);
  if (!validatedSubject.success || !validatedSubjectId.success) {
    return {
      message: "Invalid subject data.",
    };
  }

  const subject = await getSubjectById(id);

  if (!subject) {
    return {
      message: "Subject not found.",
    };
  }

  if (subject.userId !== session.user.id) {
    return {
      message: "Not authorized to delete this subject.",
    };
  }
  //database mutation
  try {
    await prisma.subject.update({
      where: {
        id: validatedSubjectId.data,
      },
      data: validatedSubject.data,
    });
  } catch (error) {
    return {
      message: "Could not update subject.",
    };
  }

  revalidatePath("/dashboard", "layout");
}

export async function deleteSubject(subjectId: unknown) {
  // await sleep(1000);

  // authentication check
  const session = await checkAuth();

  // validation
  const validatedSubjectId = subjectIdSchema.safeParse(subjectId);
  if (!validatedSubjectId.success) {
    return {
      message: "Invalid subject data.",
    };
  }

  //authorization to check the subject Owner
  const subject = await getSubjectById(validatedSubjectId.data);

  if (!subject) {
    return {
      message: "Subject not found.",
    };
  }

  if (subject.userId !== session.user.id) {
    return {
      message: "Not authorized to delete this subject.",
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

  revalidatePath("/dashboard", "layout");
}
