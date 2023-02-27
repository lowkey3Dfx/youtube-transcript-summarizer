import GetVideo from './transcript';

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
  const transcriptPath = 'app/getTranscript/op.txt';
  const transcriptContent = fs.readFileSync(transcriptPath, 'utf8');

  return (
    <div>
      <h1>Transcript Page</h1>
      <GetVideo />
      <p>{videoTitle}</p>
      <p>Channel: {channelTitle}</p>

      <p>{videoDescription}</p>
      <p>Channel ID: {channelId}</p>
      <img
        src={thumbnail}
        alt="thumbnail from channel"
        height={480}
        width={640}
      />
      <p>{transcriptContent}</p>
    </div>
  );
}
