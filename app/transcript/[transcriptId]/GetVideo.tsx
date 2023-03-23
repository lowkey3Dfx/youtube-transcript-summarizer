'use client';

import YouTube from 'react-youtube';

type Props = {
  params: {
    transcriptId: string;
  };
};

export default function GetVideo(props: Props) {
  const videoId = props.params.transcriptId;
  // console.log(props);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {},
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
}
