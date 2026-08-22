/**
 * Create the first admin user.
 * Run: node scripts/create-admin.js
 *
 * Requires DATABASE_URL in .env.local
 * Requires: npm install (prisma, bcryptjs already in package.json)
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const prisma = new PrismaClient();

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log("\n🔱 BGVM 2027 — Create Admin User\n");

  const email = await ask("Admin email: ");
  const password = await ask("Admin password (min 8 chars): ");

  if (!email || !password || password.length < 8) {
    console.error("❌  Email and password (min 8 chars) are required.");
    rl.close();
    process.exit(1);
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(`⚠️  Admin with email ${email} already exists.`);
    rl.close();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.admin.create({
    data: { email, passwordHash, role: "admin" },
  });

  console.log(`\n✅  Admin created successfully!`);
  console.log(`   ID:    ${admin.id}`);
  console.log(`   Email: ${admin.email}`);
  console.log(`\n   Login at: http://localhost:3000/admin/login\n`);

  rl.close();
}

main()
  .catch((e) => { console.error("Error:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
