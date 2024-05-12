"use server";

import prisma from "@/lib/db";
import { getTodayDate } from "@/utils/getTodayDate";

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
}

export async function getStudents() {
  const students = await prisma.student.findMany();

  return students;
}

export async function geAttendanceByStudentId(studentId: any) {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: studentId,
    },
  });

  return attendance;
}

export async function updateAttendance(attendanceId: any, isPresent: any) {
  try {
    await prisma.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        present: isPresent,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not update attendance",
    };
  }
}

export async function getAttendanceRecord() {
  const studentAttendance = await prisma.student.findMany({
    include: {
      attendance: true,
    },
  });

  return studentAttendance;
}
