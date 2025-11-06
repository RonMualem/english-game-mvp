
'use client';
import { useEffect, useRef, useState } from 'react';
import { LEVELS } from '../../lib/game';

type Q = { id: string; he: string; level: number; timeLimitSec: number };

export default function Quiz() {
  const [levelId, setLevelId] = useState(1);
  const [q, setQ] = useState<Q | null>(null);
  const [answer, setAnswer] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const startRef = useRef<number>(0);
  const tRef = useRef<any>(null);

  useEffect(() => { next(); }, [levelId]);

  const next = async () => {
    setMsg(null); setAnswer(''); setTimer(0);
    const res = await fetch('/api/quiz/next?level=' + levelId);
    if (res.ok) {
      const data = await res.json();
      setQ(data);
      startRef.current = performance.now();
      clearInterval(tRef.current);
      tRef.current = setInterval(() => {
        setTimer(Math.floor((performance.now() - startRef.current)/1000));
      }, 200);
    } else if (res.status === 401) {
      window.location.href = '/login';
    }
  };

  const submit = async () => {
    if (!q) return;
    const elapsedMs = performance.now() - startRef.current;
    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ wordId: q.id, answer, elapsedMs, level: levelId })
    });
    const data = await res.json();
    if (res.ok) {
      setMsg(data.correct ? `✅ נכון! +${data.points} נק׳` : `❌ לא נכון. התשובה: ${data.correctAnswer}`);
      setTimeout(() => next(), 1200);
    } else {
      setMsg(data.error || 'Error');
    }
  };

  return (
    <div className="card" style={{maxWidth:640}}>
      <h2>Vocabulary Quiz</h2>
      <p className="lead">כתוב את התרגום באנגלית. הזמן רץ…</p>
      <div className="row">
        <select className="select" value={levelId} onChange={e=>setLevelId(Number(e.target.value))}>
          {LEVELS.map(l => <option key={l.id} value={l.id}>{l.name} ({l.timeLimitSec}s)</option>)}
        </select>
      </div>

      {q && (
        <div style={{marginTop:16}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="badge">Level {q.level}</div>
            <div className="timer">{timer}s / {q.timeLimitSec}s</div>
          </div>
          <h3 style={{fontSize:28, margin:'12px 0'}}>{q.he}</h3>
          <div className="row">
            <input className="input" placeholder="English translation" value={answer} onChange={e=>setAnswer(e.target.value)} onKeyDown={(e)=>{ if (e.key==='Enter') submit(); }}/>
            <button className="button" onClick={submit} disabled={timer>q.timeLimitSec}>Submit</button>
          </div>
          {timer>q.timeLimitSec && <p className="error">⏰ הזמן עבר! לחץ Next לשאלה הבאה.</p>}
        </div>
      )}

      <div style={{marginTop:12}}>
        <button className="button" onClick={next}>Next</button>
      </div>

      {msg && <p style={{marginTop:12}}>{msg}</p>}
    </div>
  );
}
