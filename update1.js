const fs = require('fs');
const content = `import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const sql = neon(process.env.DATABASE_URL!);
    
    let items;
    if (category) {
      items = await sql\`SELECT * FROM "GalleryItem" WHERE category = \${category} ORDER BY "uploadedAt" DESC LIMIT 100\`;
    } else {
      items = await sql\`SELECT * FROM "GalleryItem" ORDER BY "uploadedAt" DESC LIMIT 100\`;
    }

    return NextResponse.json(items);
  } catch (err) {
    console.error("[GET /api/gallery]", err);
    return NextResponse.json([], { status: 200 });
  }
}
`;
fs.writeFileSync('C:\\Users\\Harsha\\Music\\bgvm2027\\app\\api\\gallery\\route.ts', content);
