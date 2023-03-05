import styles from './page.module.scss';

const fs = require('node:fs');

export default async function TranscriptPage() {
  const videoUrl = 'https://www.youtube.com/watch?v=8D9XnnjFGMs';
  const videoId = videoUrl.split('v=')[1];
  console.log(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.API_KEY}`,
  );

  // fetch youtube data with API
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.API_KEY}`,
  );

  const res = await data.json();
  const videoRes = res.items[0].snippet;
  const videoTitle = videoRes.title;
  const videoDescription = videoRes.description;
  const thumbnail = videoRes.thumbnails.standard.url;
  const channelId = videoRes.channelId;
  const channelTitle = videoRes.channelTitle;

  // use 'readFileSync' method of the 'fs' module to read the file and return its contents as sting
  // const transcriptPath = 'app/getTranscript/op.txt';
  // const transcriptContent = fs.readFileSync(transcriptPath, 'utf8');

  function getFileContents(transcriptPath: string) {
    try {
      // Check if file exists
      if (fs.existsSync('app/getTranscript/op.txt')) {
        // Read file contents
        const contents = fs.readFileSync('app/getTranscript/op.txt', 'utf-8');
        return contents;
      } else {
        return undefined;
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  const fileContents = getFileContents('./op.txt');
  console.log(fileContents); // Will log file contents or undefined if file doesn't exist

  return (
    <div>
      <h1>Transcript Page</h1>
      <p>{videoTitle}</p>
      <p>Channel: {channelTitle}</p>

      <p>{videoDescription}</p>
      <p>Channel ID: {channelId}</p>
      <GetVideo children={undefined} />
      <img
        src={thumbnail}
        alt="thumbnail from channel"
        height={480}
        width={640}
      />
      <div className={styles.transcriptContainer}>
        <p>{fileContents}</p>
      </div>
    </div>
  );
}
