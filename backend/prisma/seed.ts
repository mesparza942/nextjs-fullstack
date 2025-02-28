import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userCreated = await prisma.user.upsert({
    where: { cognitoId: "34e8a4a8-f0a1-70ad-99ad-8005410a24b1" },
    update: {},
    create: {
      name: "Marcelo Esparza",
      cognitoId: "34e8a4a8-f0a1-70ad-99ad-8005410a24b1",
    },
  });
  console.log("User created: ", userCreated);

  const note1 = await prisma.note.create({
    data: {
      title: "First note",
      content: "This is the first note",
      userId: userCreated.id,
    },
  });
  console.log("Note created: ", note1);

  const note2 = await prisma.note.create({
    data: {
      title: "Second note",
      content: "This is the second note",
      userId: userCreated.id,
    },
  });
  console.log("Note created: ", note2);

  const note3 = await prisma.note.create({
    data: {
      title: "Third note",
      content: "This is the third note",
      userId: userCreated.id,
    },
  });
  console.log("Note created: ", note3);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error("Error seeding database: ", err);
    await prisma.$disconnect();
    process.exit(1);
  });
