'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import YouTube from 'react-youtube';

export default function TranscriptForm() {
  const [url, setUrl] = useState('');
  const [video, setVideo] = useState('');
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState<string>();
  const userId = 1;

  const youTubeVideoId = require('youtube-video-id');
  const urlVideoId = youTubeVideoId(url);

  const router = useRouter();

  async function getYtFetch() {
    try {
      if (urlVideoId !== '') {
        // fetch youtube data with API
        const data = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${urlVideoId}&part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
        );

        const response = await data.json();
        const items = await response.items;
        const snippet = items[0].snippet;
        setVideoId(items[0].id);
        setVideo(snippet);

        console.log('video string', video.title);

        router.refresh();
      } else {
        return undefined;
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };

  console.log(video.title);
  return (
    <div>
      <input
        value={url}
        placeholder="URL..."
        onChange={(event) => setUrl(event.currentTarget.value)}
      />
      <button onClick={getYtFetch}>Go</button>
      <button onClick={() => setUrl('')}>Clear</button>
      <button
        onClick={async () => {
          console.log('clicked');
          const response = await fetch('/api/transcript', {
            method: 'POST',
            body: JSON.stringify({
              userId: userId,
              transcriptId: videoId,
              fullTranscript: video.publishedAt,
              summary: video.description,
              channelId: video.channelId,
              channelTitle: video.channelTitle,
              channelLogo: video.thumbnails.standard.url,
              videoTitle: video.title,
              videoDescription: video.description,
              thumbnail: video.thumbnails.standard.url,
              videoTags: video.tags,
            }),
          });

          console.log('dataorsmth', response);
          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh();

          // setAnimals([...animals, data.animal]);
        }}
      >
        Add to Gallery
      </button>
      {videoId === urlVideoId && url !== videoId ? (
        <div>
          <p>Video Title: {video.title}</p>
          <div>
            <YouTube videoId={videoId} opts={opts} />
          </div>
          <p>Channel Title: {video.channelTitle}</p>
          <p>Description: {video.description}</p>
          <p>Video ID: {videoId}</p>
          <p>Channel ID: {video.channelId}</p>
          <p>Video Tags: {video.tags}</p>
          <img src={video.thumbnails.standard.url} alt={video.title} />
          <p>Thumbnail URL: {video.thumbnails.standard.url}</p>
        </div>
      ) : undefined}
    </div>
  );
}
