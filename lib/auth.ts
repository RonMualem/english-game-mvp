
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const COOKIE = 'eg_session';

export type Session = { userId: string; username: string };

export function setSession(session: Session) {
  if (!process.env.JWT_SECRET) throw new Error('Missing JWT_SECRET');
  const token = jwt.sign(session, process.env.JWT_SECRET, { expiresIn: '30d' });
  cookies().set(COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: true, path: '/' });
}

export function clearSession() {
  cookies().set(COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 0 });
}

export function getSession(): Session | null {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as Session;
    return data;
  } catch {
    return null;
  }
}
