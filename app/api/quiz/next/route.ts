
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { getSession } from '../../../../lib/auth';
import { LEVELS } from '../../../../lib/game';

export async function GET(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const level = Number(searchParams.get('level') || 1);
  const limit = LEVELS.find(l => l.id === level)?.timeLimitSec ?? 20;

  // pick a random word with target level or +/-1 for variety
  const levels = [level, Math.max(1, level-1), Math.min(3, level+1)];
  const words = await prisma.word.findMany({ where: { level: { in: levels } }, take: 50 });
  if (words.length === 0) return NextResponse.json({ error: 'No words seeded' }, { status: 500 });
  const w = words[Math.floor(Math.random()*words.length)];
  return NextResponse.json({ id: w.id, he: w.he, level: w.level, timeLimitSec: limit });
}
