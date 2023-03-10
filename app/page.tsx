import styles from './page.module.scss';
import GetVideo from './transcript/transcript';

export default function Home() {
  return (
    <main>
      <p>Save your Favorites</p>
      <button>Sign up</button>
      <button>Login</button>
      <h1>Summarize YouTube Transcripts in Seconds</h1>
      <p>
        enter the URL of the YouTube video you want to summarize in the input
        field and give it a "Go"
      </p>
      <GetVideo children={undefined} />
    </main>
  );
}
