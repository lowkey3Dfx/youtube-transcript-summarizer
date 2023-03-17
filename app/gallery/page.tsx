import Image from 'next/image';
import Link from 'next/link';
import { getTranscripts } from '../../database/transcripts';
import GalleryPage from './GalleryPage';
import styles from './page.module.scss';

export const metadata = {
  title: 'Transcripts',
  description: 'This is the Transcripts page',
};

type Props = {
  props: string[];
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  const transcripts = await getTranscripts();

  return (
    <main className={styles.pageMain}>
      <div className={styles.mainDiv}>
        <h1>Gallery</h1>
        <div className={styles.divOne}>
          <div className={styles.container}>
            {transcripts.map((data) => {
              // console.log(data);
              // console.log(data.video_title);
              return (
                <div
                  key={`transcript-${data.transcriptId}`}
                  className={styles.divTwo}
                >
                  <Link href={`/transcript/${data.transcriptId}`}>
                    <img
                      src={data.thumbnail}
                      alt={data.videoTitle}
                      width="320"
                      height="240"
                    />
                  </Link>
                  <Link href={`/transcript/${data.transcriptId}`}>
                    <h2>{data.videoTitle}</h2>
                  </Link>
                  <div className={styles.channelInfo}>
                    <img
                      src={data.thumbnail}
                      alt={data.channelLogo}
                      width="80"
                      height="60"
                    />
                    <p>{data.channelTitle}</p>
                  </div>
                  <GalleryPage props={transcripts} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
