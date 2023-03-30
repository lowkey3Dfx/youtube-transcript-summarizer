'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import YouTube from 'react-youtube';
import styles from './page.module.scss';

type Video = {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  tags: string[];
  thumbnails: {
    standard: {
      url: string;
    };
  };
};

export default function TranscriptForm(props: Props) {
  const [url, setUrl] = useState<string>('');
  const [video, setVideo] = useState<Video>();
  const [error, setError] = useState<string>();
  const [fullTranscript, setFullTranscript] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');

  // const userId = props.userId;

  const youTubeVideoId = require('youtube-video-id');
  const urlVideoId = youTubeVideoId(url);

  const router = useRouter();

  useEffect(() => {
    async function getYoutubeData() {
      try {
        if (urlVideoId !== '') {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?id=${urlVideoId}&part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
          );

          const data = await response.json();
          const items = data.items;
          const snippet = items[0].snippet;
          setVideoId(items[0].id);
          setVideo(snippet);
        } else {
          setVideoId('');
          setVideo(undefined);
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching data from YouTube API');
      }
    }

    async function postVideoIdData() {
      try {
        const response = await fetch('/api/video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transcript data');
        }

        const fullTranscriptResponse = await response.json();
        // console.log('Marker R', videoId);
        // console.log('Marker V', fullTranscriptResponse);
        setFullTranscript(fullTranscriptResponse.fullTranscript);

        router.refresh();
      } catch (err) {
        console.error(err);
        setError('Error fetching transcript data');
      }
    }

    getYoutubeData();
    if (videoId) {
      postVideoIdData();
    }
  }, [urlVideoId, videoId]);

  async function addToGallery() {
    const userId = props.userId;
    console.log('marker ID', userId);
    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          transcriptId: videoId,
          fullTranscript: fullTranscript,
          summary: video?.description,
          channelId: video?.channelId,
          channelTitle: video?.channelTitle,
          channelLogo: video?.thumbnails.standard.url,
          videoTitle: video?.title,
          videoDescription: video?.description,
          thumbnail: video?.thumbnails.standard.url,
          videoTags: video?.tags,
        }),
      });

      const data = await response.json();
      // conditionals gehen nicht durch

      if (data.error) {
        setError(data.error);
        toast.error('Transcript exists in gallery!');
        return;
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Error adding transcript to gallery');
    }
    toast.success('Transcript added to gallery!');
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {},
  };

  return (
    <>
      <Toaster />
      <div className={styles.container}>
        <div className={styles.mainDiv}>
          <h1>Transcript Page</h1>
          <div className={styles.divOne}>
            <div className={styles.inputField}>
              <input
                value={url}
                placeholder="URL..."
                onChange={(event) => setUrl(event.currentTarget.value)}
              />
              <div className={styles.buttons}>
                <button onClick={addToGallery}>Add to Gallery</button>
                <button
                  onClick={() => {
                    setUrl('');
                    setVideoId('');
                    setFullTranscript('');
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className={styles.innerContainer}>
              <div className={styles.divOneLeft}>
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
                    <img
                      src={video.thumbnails.standard.url}
                      alt={video.title}
                    />
                    <p>Thumbnail URL: {video.thumbnails.standard.url}</p>
                  </div>
                ) : undefined}
              </div>
              <div className={styles.divOneRight}>{fullTranscript}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
