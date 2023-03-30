import { redirect } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getValidSessionByToken } from '../../database/sessions';
import {
  getTranscriptByTranscriptId,
  getTranscripts,
} from '../../database/transcripts';
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
  const reversedTranscript = transcripts.reverse();

  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  if (!session) {
    return console.log('no session');
  }

  // if yes redirect to home
  // for example you may also check if session user is an admin role

  return (
    <main className={styles.pageMain}>
      <div className={styles.mainDiv}>
        <h1>Gallery</h1>
        <div className={styles.divOne}>
          <div className={styles.container}>
            {reversedTranscript.map((data) => {
              const userId = Number(data.userId);
              if (userId === session.userId) {
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
                    <div className={styles.h2Div}>
                      <Link href={`/transcript/${data.transcriptId}`}>
                        <h2>{data.videoTitle}</h2>
                      </Link>
                    </div>
                    <div className={styles.channelInfo}>
                      <img
                        src={data.channelLogo}
                        alt={data.channelLogo}
                        width="80"
                        height="60"
                      />
                      <p>{data.channelTitle}</p>
                    </div>
                    <GalleryPage transcripts={data} userId={session.userId} />
                  </div>
                );
              }
              // console.log(data);

              return '';
              // <div
              //   key={`transcript-${data.transcriptId}`}
              //   className={styles.divTwo}
              // >
              //   <Link href={`/transcript/${data.transcriptId}`}>
              //     <img
              //       src={data.thumbnail}
              //       alt={data.videoTitle}
              //       width="320"
              //       height="240"
              //     />
              //   </Link>
              //   <div className={styles.h2Div}>
              //     <Link href={`/transcript/${data.transcriptId}`}>
              //       <h2>{data.videoTitle}</h2>
              //     </Link>
              //   </div>
              //   <div className={styles.channelInfo}>
              //     <img
              //       src={data.thumbnail}
              //       alt={data.channelLogo}
              //       width="80"
              //       height="60"
              //     />
              //     <p>{data.channelTitle}</p>
              //   </div>
              //   <GalleryPage transcripts={data} userId={session.userId} />
              // </div>
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
