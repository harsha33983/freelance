import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany();
    return NextResponse.json({ success: true, count: articles.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, code: err.code, name: err.name });
  }
}
