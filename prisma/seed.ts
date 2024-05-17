import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  username: "admin",
  hashedPassword: "",
  students: {
    create: [
      {
        name: "Abiera, Marc",
        idNumber: "0012",
        attendance: {
          create: [
            {
              present: true,
              createdAt: new Date("2024-05-13"),
              updatedAt: new Date("2024-05-13"),
            },
            {
              present: false,
              createdAt: new Date("2024-05-14"),
              updatedAt: new Date("2024-05-14"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-15"),
              updatedAt: new Date("2024-05-15"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-16"),
              updatedAt: new Date("2024-05-16"),
            },
          ],
        },
      },
      {
        name: "Abion, Ledylyn",
        idNumber: "0014",
        attendance: {
          create: [
            {
              present: true,
              createdAt: new Date("2024-05-13"),
              updatedAt: new Date("2024-05-13"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-14"),
              updatedAt: new Date("2024-05-14"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-15"),
              updatedAt: new Date("2024-05-15"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-16"),
              updatedAt: new Date("2024-05-16"),
            },
          ],
        },
      },
      {
        name: "Benitez, John Daniel",
        idNumber: "00013",
        attendance: {
          create: [
            {
              present: true,
              createdAt: new Date("2024-05-13"),
              updatedAt: new Date("2024-05-13"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-14"),
              updatedAt: new Date("2024-05-14"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-15"),
              updatedAt: new Date("2024-05-15"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-16"),
              updatedAt: new Date("2024-05-16"),
            },
          ],
        },
      },
      {
        name: "Botiquin, Efraim",
        idNumber: "00013",
        attendance: {
          create: [
            {
              present: true,
              createdAt: new Date("2024-05-13"),
              updatedAt: new Date("2024-05-13"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-14"),
              updatedAt: new Date("2024-05-14"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-15"),
              updatedAt: new Date("2024-05-15"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-16"),
              updatedAt: new Date("2024-05-16"),
            },
          ],
        },
      },
      {
        name: "Deguzman, Erron Zymon",
        idNumber: "00013",
        attendance: {
          create: [
            {
              present: true,
              createdAt: new Date("2024-05-13"),
              updatedAt: new Date("2024-05-13"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-14"),
              updatedAt: new Date("2024-05-14"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-15"),
              updatedAt: new Date("2024-05-15"),
            },
            {
              present: true,
              createdAt: new Date("2024-05-16"),
              updatedAt: new Date("2024-05-16"),
            },
          ],
        },
      },
    ],
  },
  subjects: {
    create: [
      {
        name: "Programming C++",
        start: "09:00",
        end: "10:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};

async function main() {
  console.log(`Start seeding ...`);

  const hashedPassword = await bcrypt.hash("admin", 10);
  userData.hashedPassword = hashedPassword;

  await prisma.user.create({
    data: userData,
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
