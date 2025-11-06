
'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function Leaderboard() {
  const { data } = useSWR('/api/leaderboard', fetcher, { refreshInterval: 5000 });

  return (
    <div className="card">
      <h2>Leaderboard</h2>
      <table style={{width:'100%', marginTop:12, borderCollapse:'collapse'}}>
        <thead>
          <tr><th style={{textAlign:'left'}}>#</th><th style={{textAlign:'left'}}>User</th><th style={{textAlign:'left'}}>Score</th></tr>
        </thead>
        <tbody>
          {data?.rows?.map((r: any, i: number) => (
            <tr key={r.id} style={{borderTop:'1px solid #1b2552'}}>
              <td>{i+1}</td>
              <td>{r.username}</td>
              <td>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
