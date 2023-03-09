import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranscriptById } from '../../../database/transcripts';
import { transcriptNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: Props): Promise<Metadata> {
  const singleTranscript = await getTranscriptById(
    parseInt(props.params.transcriptId),
  );

  if (!singleTranscript) {
    return transcriptNotFoundMetadata;
  }

  return {
    title: singleTranscript.videoTitle,
    description: singleTranscript.summary,
  };
}

type Props = {
  params: {
    transcriptId: string;
  };
};

export default async function TranscriptPage(props: Props) {
  console.log(props);
  const singleTranscript = await getTranscriptById(
    parseInt(props.params.transcriptId),
  );

  if (!singleTranscript) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <>
      <h1>{singleTranscript.videoTitle}</h1>
      <main>
        <p>{singleTranscript.fullTranscript}</p>
      </main>
    </>
  );
}
