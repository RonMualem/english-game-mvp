
import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';

export const runtime = 'nodejs'; // required for file handling

export async function POST(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const form = await req.formData();
    const audio = form.get('audio') as File | null;
    if (!audio) return NextResponse.json({ error: 'Missing audio' }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) {
      // Offline stub: pretend we transcribed and graded
      return NextResponse.json({
        transcript: '(stub) I gave a status update about our sprint.',
        feedback: '(stub) Good structure. Watch verb tenses: use "we have deployed", not "we deployed" in status. Pronounce "architecture" clearly.',
        points: 15
      });
    }

    // If you want real STT + feedback, plug in your provider here. Example (commented):
    // const openai = new (await import('openai')).default({ apiKey: process.env.OPENAI_API_KEY });
    // const stt = await openai.audio.transcriptions.create({ file: audio, model: 'whisper-1' });
    // const transcript = stt.text;
    // const feedbackRes = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [
    //     { role: 'system', content: 'Grade English speaking for workplace scenarios. Give 2-3 concrete corrections and a 0-20 score.' },
    //     { role: 'user', content: transcript }
    //   ]
    // });
    // const feedback = feedbackRes.choices[0].message?.content ?? 'Good job!';
    // const points = Math.min(20, Math.max(0, Math.round((feedback.match(/(\d{1,2})\s*\/\s*20/)|[])[1] ?? 12)));
    // return NextResponse.json({ transcript, feedback, points });

    // Temporary fallback
    return NextResponse.json({
      transcript: '(stub) I gave a status update about our sprint.',
      feedback: '(stub) Good structure. Watch verb tenses: use "we have deployed", not "we deployed" in status. Pronounce "architecture" clearly.',
      points: 15
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Voice error' }, { status: 500 });
  }
}
