import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
import styles from './page.module.scss';
import GetVideo from './transcript';

const fs = require('node:fs');

// Pages are Server Components by default
export default async function Page() {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home

  // for example you may also check if session user is an admin role

  if (!session) {
    // if not logged in first has to log in and then redirect to transcript/ gallery page
    redirect('/login?returnTo=/transcript');
  }

  const videoUrl = 'https://www.youtube.com/watch?v=8D9XnnjFGMs';
  const videoId = videoUrl.split('v=')[1];

  // fetch youtube data with API
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
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
