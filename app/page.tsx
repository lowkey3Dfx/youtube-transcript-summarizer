import GetVideo from './transcript/transcript';

export default function Home() {
  return (
    <main>
      <p>Save your Favorites</p>
      <button>Sign up</button>
      <button>Login</button>
      <h1>Summarize YouTube Transcripts in Seconds</h1>
      <GetVideo children={undefined} />
    </main>
  );
}
