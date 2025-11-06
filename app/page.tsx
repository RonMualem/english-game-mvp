
export default function Home() {
  return (
    <div className="card">
      <h1>Welcome 👋</h1>
      <p className="lead">Tech & business English practice for the family: timed vocab quiz + voice chat with feedback.</p>
      <ul>
        <li>Sign up and log in to track points.</li>
        <li>Quiz shows a <b>Hebrew term</b> — type the <b>English translation</b>.</li>
        <li>Timer & difficulty levels affect points.</li>
        <li>Voice mode: speak and get feedback (stubbed; requires OPENAI_API_KEY).</li>
      </ul>
    </div>
  );
}
