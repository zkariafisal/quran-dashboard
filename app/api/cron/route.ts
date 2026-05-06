import { db } from '@vercel/postgres';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://dashboard.injaazy.com/institution/report/daily', {
    headers: { 'Cookie': process.env.INJAAZY_COOKIE || '' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const client = await db.connect();

  const issues = [];
  $('table').last().find('tbody tr').each((_, row) => {
    const name = $(row).find('td').eq(0).text().trim();
    const att = parseInt($(row).find('td').eq(5).text()) || 0;
    if (att < 5) issues.push({ name, reason: 'حضور ضعيف' });
  });

  for (const item of issues) {
    await client.sql`INSERT INTO circle_reports (circle_name, reason) VALUES (${item.name}, ${item.reason})`;
  }
  return NextResponse.json({ success: true });
}
