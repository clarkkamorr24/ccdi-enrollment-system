import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  username: "admin",
  hashedPassword: "",
  students: {
    create: [
      {
        name: "John Doe",
        idNumber: "123456789",
      },
      {
        name: "Billy Doe",
        idNumber: "341234567",
      },
      {
        name: "Jodel Magonles",
        idNumber: "125456789",
      },
      {
        name: "Justin Magonles",
        idNumber: "3354176789",
      },
      {
        name: "John Lloyd Magonles",
        idNumber: "7854176789",
      },
      {
        name: "Jerome Magonles",
        idNumber: "7857896789",
      },
      {
        name: "JM Amor",
        idNumber: "123567578",
      },
      {
        name: "Post Malone",
        idNumber: "984323",
      },
      {
        name: "Drake",
        idNumber: "67436675",
      },
      {
        name: "Travis Scott",
        idNumber: "956432",
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
