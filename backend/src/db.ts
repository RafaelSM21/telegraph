import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export async function ensureDatabase() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "MorseMessage" (
      "id" SERIAL PRIMARY KEY,
      "raw"       TEXT NOT NULL,
      "decoded"   TEXT NOT NULL,
      "createdAt" TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}
