// Prisma client singleton for Next.js
// The Prisma client is generated at `npx prisma generate` / `npx prisma db push`
// During build without a DB, the import is guarded so the build can complete.

/* eslint-disable @typescript-eslint/no-explicit-any */
let prismaInstance: any;

function getPrisma() {
  if (prismaInstance) return prismaInstance;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    const { Pool, neonConfig } = require("@neondatabase/serverless");
    const { PrismaNeon } = require("@prisma/adapter-neon");
    const ws = require("ws");
    const fs = require("fs");
    const path = require("path");

    neonConfig.webSocketConstructor = ws;

    const globalForPrisma = globalThis as any;
    
    if (!globalForPrisma.prisma) {
      let envUrl = process.env["DATABASE_URL"] || process.env.DATABASE_URL;
      
      // Fallback if Next.js dev server hides the env var
      if (!envUrl || envUrl === "undefined") {
        try {
          const envPath = path.join(process.cwd(), ".env");
          if (fs.existsSync(envPath)) {
            const envFile = fs.readFileSync(envPath, "utf-8");
            const match = envFile.match(/^DATABASE_URL=(.*)$/m);
            if (match && match[1]) {
              envUrl = match[1].trim().replace(/^['"]|['"]$/g, "");
            }
          }
        } catch (e) {
          console.error("Failed to read .env manually", e);
        }
      }

      // Final safety fallback
      if (!envUrl || envUrl === "undefined") {
        envUrl = "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true";
      }

      const pool = new Pool({ connectionString: envUrl });
      const adapter = new PrismaNeon(pool);

      globalForPrisma.prisma = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });
    }
    
    prismaInstance = globalForPrisma.prisma;
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }
    return prismaInstance;
  } catch {
    // PrismaClient not yet generated — will be available after `prisma db push`
    return null;
  }
}

export const prisma = new Proxy({} as any, {
  get(_target, prop) {
    const client = getPrisma();
    if (!client) {
      throw new Error(
        "Prisma client not generated. Run `npx prisma db push` first."
      );
    }
    return client[prop];
  },
});
