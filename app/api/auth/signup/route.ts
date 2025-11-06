
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(4).max(64),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const { username, password } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) return NextResponse.json({ error: 'Username taken' }, { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { username, password: hash } });
  return NextResponse.json({ ok: true });
}
