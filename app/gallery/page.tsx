import Image from 'next/image';
import Link from 'next/link';
import { getTranscripts } from '../../database/transcripts';

export const metadata = {
  title: 'Animals',
  description: 'This is my Animals page',
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const transcripts = await getTranscripts();

  return (
    <>
      <h1>Gallery</h1>
      <main>
        {transcripts.map((data) => {
          // console.log(data);
          // console.log(data.video_title);
          return (
            <div key={`transcript-${data.transcriptId}`}>
              <Link href={`/transcript/${data.transcriptId}`}>
                <h2>{data.videoTitle}</h2>
              </Link>
              <Link href={`/transcript/${data.transcriptId}`}>
                <img
                  src={data.thumbnail}
                  alt={data.videoTitle}
                  width="320"
                  height="240"
                />
              </Link>
              <div>
                <img
                  src={data.channelLogo}
                  alt={data.channelLogo}
                  width="50"
                  height="50"
                />
                <p>{data.channelTitle}</p>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}
