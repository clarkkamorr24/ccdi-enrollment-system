"use server";

import prisma from "@/lib/db";

export async function addAttendance(studentId: any) {
  try {
    await prisma.attendance.create({
      data: {
        present: true,
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

export async function getWeeklyAttendance(studentId: any) {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: studentId,
    },
  });
  console.log(attendance);
  return attendance;
}

export async function getStudentAttendanceWeeklyRecord() {
  const attendance = await prisma.attendance.findMany({});

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
