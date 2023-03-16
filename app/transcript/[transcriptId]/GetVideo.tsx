'use client';

import YouTube from 'react-youtube';

type Props = {
  params: {
    transcriptId: string;
  };
};

export default function GetVideo(props: Props) {
  const singleTranscript = props;
  const videoId = props.params.transcriptId;
  // console.log(props);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {},
  };

  return (
    <div>
      <div>
        {/* <p>{singleTranscript.videoTitle}</p>
        <p>{singleTranscript.transcriptId}</p>
        <p>Channel: {singleTranscript.channelTitle}</p>
        <p>Thumbnail url: {singleTranscript.thumbnail}</p>

        <p>{singleTranscript.videoDescription}</p>
        <p>Channel ID: {singleTranscript.channelId}</p>
        <p>Video tags: {singleTranscript.videotags}</p>
        <img
          src={singleTranscript.thumbnail}
          alt="thumbnail"
          height={480}
          width={640}
        /> */}
      </div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
}
