import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

const hashedPassword = await bcrypt.hash("admin@123", 10);
await prisma.user.upsert({
  where: {
    email: "admin@example.com",
  },
  update: {
    name: "Admin",
    password: hashedPassword,
  },
  create: {
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
  },
});

prisma.$disconnect();