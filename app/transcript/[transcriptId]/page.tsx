import { notFound } from 'next/navigation';
import {
  getTranscriptByTranscriptId,
  getTranscripts,
} from '../../../database/transcripts';
import GetVideo from './GetVideo';

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
      <div>
        <p>{singleTranscript.videoTitle}</p>
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
        />
      </div>
      <div>
        <GetVideo
          params={{
            transcriptId: videoId,
          }}
        />
      </div>
    </div>
  );
}
