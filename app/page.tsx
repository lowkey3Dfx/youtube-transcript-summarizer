import styles from './page.module.scss';
import GetVideo from './transcript/transcript';

export default function Home() {
  return (
    <main className={styles.pageMain}>
      <div className={styles.mainDiv}>
        <div className={styles.divOne}>
          <p>Save your Favorites</p>
          <button>Sign up</button>
          <button>Login</button>
        </div>
        <h1>
          Summarize YouTube
          <br /> Transcripts in Seconds
        </h1>
        <h2>Paste YouTube URL and and summarize</h2>
        <div className={styles.divTwo}>
          <input placeholder="URL..." />
          <button className={styles.summarizeButton}>Summarize</button>
          {/* <GetVideo children={undefined} /> */}
        </div>
      </div>
    </main>
  );
}
