import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const students = [
  {
    name: "John Doe",
    idNumber: "123456789",
    attendance: {
      create: [
        {
          date: new Date("2024-05-10"),
          present: true,
        },
        {
          date: new Date("2023-05-11"),
          present: false,
        },
      ],
    },
  },
  {
    name: "Jane Doe",
    idNumber: "341234567",
    attendance: {
      create: [
        {
          date: new Date("2024-05-10"),
          present: true,
        },
        {
          date: new Date("2023-05-11"),
          present: true,
        },
      ],
    },
  },
  {
    name: "Diego Doe",
    idNumber: "335456789",
    attendance: {
      create: [
        {
          date: new Date("2024-05-10"),
          present: true,
        },
        {
          date: new Date("2023-05-11"),
          present: true,
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const student of students) {
    const result = await prisma.student.create({
      data: student,
    });
    console.log(`Created student with id: ${result.id}`);
  }

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
