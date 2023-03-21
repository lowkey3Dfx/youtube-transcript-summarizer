'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TranscriptForm() {
  const [url, setUrl] = useState('');
  const [video, setVideo] = useState('');
  const [videoId, setVideoId] = useState('');

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

        console.log(snippet);

        router.refresh();
      } else {
        return undefined;
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  return (
    <div>
      <input
        value={url}
        placeholder="URL..."
        onChange={(event) => setUrl(event.currentTarget.value)}
      />
      <button onClick={getYtFetch}>Go</button>
      <button>Clear</button>
      <button>Add to Gallery</button>
      <p>Video Title: {video.title}</p>
      <p>Channel Title: {video.channelTitle}</p>
      <img src={video.thumbnails.standard.url} alt={video.title} />
      <p>Video ID: {videoId}</p>
      <p>Channel ID: {video.channelId}</p>
      <p>Thumbnail URL: {video.thumbnails.standard.url}</p>
      <p>Description: {video.description}</p>
      <p>Video Tags: {video.tags}</p>
    </div>
  );
}
