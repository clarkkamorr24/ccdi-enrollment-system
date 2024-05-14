import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  username: "admin",
  hashedPassword: "",
  students: {
    create: [
      {
        name: "Abdul-Jabbar, Kareem",
        idNumber: "000123",
      },
      {
        name: "Adebayo, Bam",
        idNumber: "000124",
      },
      {
        name: "Antetokounmpo, Giannis",
        idNumber: "000212",
      },
      {
        name: "Curry, Stephen Wardell",
        idNumber: "000213",
      },
      {
        name: "Davis, Anthony",
        idNumber: "000214",
      },
      {
        name: "Howard, Dwight",
        idNumber: "000312",
      },
      {
        name: "Green, Danny",
        idNumber: "000314",
      },
      {
        name: "Green, Draymond",
        idNumber: "000317",
      },
      {
        name: "James, Lebron",
        idNumber: "000318",
      },
      {
        name: "Jordan, Michael",
        idNumber: "000666",
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
