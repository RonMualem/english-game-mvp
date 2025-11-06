
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function GET() {
  const rows = await prisma.user.findMany({ orderBy: { score: 'desc' }, select: { id: true, username: true, score: true }, take: 50 });
  return NextResponse.json({ rows });
}
