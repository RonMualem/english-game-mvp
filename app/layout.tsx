
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'English Game MVP',
  description: 'Family English practice game (tech/business vocab + voice)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="header">
            <Link href="/"><b>English Game</b></Link>
            <nav style={{display:'flex', gap:12}}>
              <Link href="/quiz">Quiz</Link>
              <Link href="/voice">Voice</Link>
              <Link href="/leaderboard">Leaderboard</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </nav>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
