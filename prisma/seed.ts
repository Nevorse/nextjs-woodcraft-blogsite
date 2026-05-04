import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "SITE_SETTINGS_ID" },
    update: {},
    create: {
      id: "SITE_SETTINGS_ID",
      isRegistrationOpen: true,
    },
  });

  await prisma.album.upsert({
    where: { id: "COVER_ALBUM_ID" },
    update: {},
    create: {
      id: "COVER_ALBUM_ID",
      type: "COVER_ALBUM",
      title: "Cover Album",
      slug: "cover-album",
      isPublished: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
