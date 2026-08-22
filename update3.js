const fs = require('fs');
const content = `import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql\`DELETE FROM "GalleryItem" WHERE id = \${params.id}\`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/gallery/:id]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
`;
fs.writeFileSync('C:\\Users\\Harsha\\Music\\bgvm2027\\app\\api\\admin\\gallery\\[id]\\route.ts', content);
