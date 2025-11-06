
'use client';
import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOk(false);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      setError((await res.json()).error || 'Failed');
      return;
    }
    setOk(true);
  };

  return (
    <div className="card" style={{maxWidth:520}}>
      <h2>Signup</h2>
      <form onSubmit={onSubmit} className="row">
        <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="button" type="submit">Create account</button>
      </form>
      {error && <p className="error">{error}</p>}
      {ok && <p className="success">Account created! You can now <a href="/login">log in</a>.</p>}
    </div>
  );
}
