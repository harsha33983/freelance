import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const envPath = path.join(process.cwd(), ".env");
  const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "NOT FOUND";
  
  return NextResponse.json({
    cwd: process.cwd(),
    envPath,
    hasEnvVar: typeof process.env.DATABASE_URL,
    envVarValue: process.env.DATABASE_URL,
    envContentMatch: envContent.match(/^DATABASE_URL=(.*)$/m)?.[1],
  });
}
