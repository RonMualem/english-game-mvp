
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getSession } from '../../../lib/auth';
import { computePoints } from '../../../lib/game';

export async function POST(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { wordId, answer, elapsedMs, level } = body;
  const word = await prisma.word.findUnique({ where: { id: wordId } });
  if (!word) return NextResponse.json({ error: 'Word not found' }, { status: 404 });

  const correct = (answer || '').trim().toLowerCase() === word.en.trim().toLowerCase();
  const points = computePoints(level, Number(elapsedMs||0), correct);
  await prisma.attempt.create({ data: { userId: session.userId, wordId, correct, timeMs: Math.round(Number(elapsedMs||0)), level } });
  if (points > 0) {
    await prisma.user.update({ where: { id: session.userId }, data: { score: { increment: points } } });
  }
  return NextResponse.json({ correct, points, correctAnswer: word.en });
}
