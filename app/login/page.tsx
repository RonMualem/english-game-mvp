
'use client';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      setError((await res.json()).error || 'Failed');
      return;
    }
    window.location.href = '/quiz';
  };

  return (
    <div className="card" style={{maxWidth:520}}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="row">
        <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="button" type="submit">Log in</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
