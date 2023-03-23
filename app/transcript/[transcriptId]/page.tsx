import { exec } from 'child_process';
import { notFound } from 'next/navigation';
import {
  getTranscriptByTranscriptId,
  getTranscripts,
} from '../../../database/transcripts';
import GetVideo from './GetVideo';
import styles from './page.module.scss';

type Props = {
  params: {
    transcriptId: string;
  };
};

// data GETs here from database
// get video from url using react-youtube module
export default async function TranscriptPage(props: Props) {
  const singleTranscript = await getTranscriptByTranscriptId(
    props.params.transcriptId,
  );
  // console.log(props.params.transcriptId);
  // console.log(singleTranscript);
  // console.log(props);

  const videoId = props.params.transcriptId;

  if (!singleTranscript) {
    notFound();
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.mainDiv}>
          <h1>{singleTranscript.videoTitle}</h1>
          <div className={styles.divOne}>
            <div className={styles.divOneLeft}>
              <div>
                <GetVideo
                  params={{
                    transcriptId: videoId,
                  }}
                />
              </div>
              <div>Note Taling Feature</div>
            </div>
            <div className={styles.divOneRight}>
              <div className={styles.divOneRightOne}>
                <h2>Transcript</h2>
                <p>{singleTranscript.fullTranscript}</p>
              </div>
              <div className={styles.divOneRightTwo}>
                <h2>Additional Video Information</h2>
                <h2>Channel: {singleTranscript.channelTitle}</h2>

                <p>{singleTranscript.videoDescription}</p>
                <p>Video ID: {singleTranscript.transcriptId}</p>
                <p>Channel ID: {singleTranscript.channelId}</p>
                <img
                  src={singleTranscript.thumbnail}
                  alt="thumbnail"
                  height={240}
                  width={320}
                />
                <p>Thumbnail url: {singleTranscript.thumbnail}</p>
                <p>Video tags: {singleTranscript.videotags}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
