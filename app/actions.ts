"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    // Process environment variables are populated automatically
    const sql = neon(process.env.DATABASE_URL!);
    // Example query using neon serverless driver
    const data = await sql`SELECT version()`;
    return data;
}
