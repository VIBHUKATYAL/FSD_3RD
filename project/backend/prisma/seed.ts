import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing database...");
  await prisma.lecture.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.class.deleteMany();
  await prisma.lecturer.deleteMany();
  await prisma.room.deleteMany();

  console.log("Seeding Rooms...");
  const floors = [
    { number: 0, prefix: "KC G" },
    { number: 1, prefix: "KC 10" },
    { number: 2, prefix: "KC 20" },
    { number: 3, prefix: "KC 30" },
    { number: 4, prefix: "KC 40" },
    { number: 5, prefix: "KC 50" },
    { number: 6, prefix: "KC 60" },
  ];

  for (const floor of floors) {
    for (let i = 1; i <= 8; i++) {
      let roomType = "Lecture";
      if (i === 1) roomType = "Seminar Hall";
      if (i === 8) roomType = "Lab";

      await prisma.room.create({
        data: {
          roomNumber: `${floor.prefix}${i}`,
          floor: floor.number,
          floorName:
            floor.number === 0 ? "Ground Floor" : `${floor.number}th Floor`,
          type: roomType,
          capacity:
            roomType === "Seminar Hall" ? 200 : roomType === "Lab" ? 30 : 60,
        },
      });
    }
  }

  console.log("Seeding Lecturers...");
  const lecturers = await Promise.all([
    prisma.lecturer.create({
      data: { name: "Dr. Ananya Sharma", department: "Computer Science" },
    }),
    prisma.lecturer.create({
      data: { name: "Prof. Rohan Mehta", department: "Information Tech" },
    }),
  ]);

  console.log("Seeding Classes...");
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        name: "B.Tech 1st Year",
        year: "1",
        department: "Common",
        section: "A",
      },
    }),
    prisma.class.create({
      data: {
        name: "B.Tech 2nd Year",
        year: "2",
        department: "CSE",
        section: "A",
      },
    }),
  ]);

  console.log("Seeding Subjects...");
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: "Data Structures", code: "CS201" } }),
    prisma.subject.create({
      data: { name: "Database Management Systems", code: "CS202" },
    }),
  ]);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
