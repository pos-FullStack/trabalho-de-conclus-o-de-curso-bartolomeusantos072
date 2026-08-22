import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@cardapioescolar.com" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@cardapioescolar.com",
      senhaHash,
      papel: "ADMINISTRADOR",
    },
  });
  console.log("Usuário administrador criado: admin@cardapioescolar.com / admin123 (trocar em produção)");
}

main().finally(() => prisma.$disconnect());
