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
      },
      {
        name: "Abion, Ledylyn",
        idNumber: "0014",
      },
      {
        name: "Benitez, John Daniel",
        idNumber: "00013",
      },
    ],
  },
  subjects: {
    create: [
      {
        name: "English",
        start: "09:00",
        end: "10:00",
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
