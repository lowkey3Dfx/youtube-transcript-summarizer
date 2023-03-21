import { exec } from 'child_process';
import { notFound } from 'next/navigation';
import {
  getTranscriptByTranscriptId,
  getTranscripts,
} from '../../../database/transcripts';
import GetVideo from './GetVideo';
import styles from './page.module.scss';

const fs = require('node:fs');

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

  function getFileContents(transcriptPath: string) {
    // function to run tget.py and generate text file with transcript
    function runPythonScript(): void {
      exec('python3 app/getTranscript/tget.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    }

    try {
      // Check if file exists
      if (fs.existsSync('app/getTranscript/op.txt')) {
        // Read file contents
        const contents = fs.readFileSync('app/getTranscript/op.txt', 'utf-8');
        return contents;
      } else {
        runPythonScript();
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  const fileContents = getFileContents('./op.txt');

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.mainDiv}>
          <div className={styles.divOne}>
            <div className={styles.divOneLeft}>
              <h1>{singleTranscript.videoTitle}</h1>
              <div>
                <GetVideo
                  params={{
                    transcriptId: videoId,
                  }}
                />
                <h2>Channel: {singleTranscript.channelTitle}</h2>

                <p>{singleTranscript.videoDescription}</p>
                <p>Video ID: {singleTranscript.transcriptId}</p>
                <p>Channel ID: {singleTranscript.channelId}</p>
                <img
                  src={singleTranscript.thumbnail}
                  alt="thumbnail"
                  height={480}
                  width={640}
                />
                <p>Thumbnail url: {singleTranscript.thumbnail}</p>
                <p>Video tags: {singleTranscript.videotags}</p>
              </div>
            </div>
            <div className={styles.divOneRight}>
              <h2>Transcript</h2>
              <p>{fileContents}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
