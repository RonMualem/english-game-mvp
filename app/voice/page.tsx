
'use client';
import { useEffect, useRef, useState } from 'react';

export default function Voice() {
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<any>(null);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mr = new MediaRecorder(stream);
        mr.ondataavailable = e => chunks.current.push(e.data);
        mr.onstop = async () => {
          const blob = new Blob(chunks.current, { type: 'audio/webm' });
          chunks.current = [];
          const form = new FormData();
          form.append('audio', blob, 'speech.webm');
          const res = await fetch('/api/voice', { method: 'POST', body: form });
          const data = await res.json();
          setResult(data);
        };
        setRec(mr);
      } catch (e) {
        alert('Microphone permission needed.');
      }
    })();
  }, []);

  return (
    <div className="card">
      <h2>Voice Practice (Beta)</h2>
      <p className="lead">דברו באנגלית על נושא עבודה (למשל: סטטוס ישיבה/אימייל ללקוח). תקבלו הערות וניקוד.</p>
      <div style={{display:'flex', gap:12}}>
        <button className="button" onClick={() => { if (!rec) return; rec.start(); setRecording(true); }}>Start</button>
        <button className="button" onClick={() => { if (!rec) return; rec.stop(); setRecording(false); }}>Stop & Analyze</button>
      </div>
      <p style={{marginTop:8}}>{recording ? '🎙️ Recording…' : 'Not recording'}</p>
      {result && (
        <div style={{marginTop:12}}>
          <p><b>Transcript:</b> {result.transcript}</p>
          <p><b>Feedback:</b> {result.feedback}</p>
          <p><b>Points:</b> {result.points}</p>
        </div>
      )}
    </div>
  );
}
