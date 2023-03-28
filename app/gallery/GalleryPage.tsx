'use client';

import { useRouter } from 'next/navigation';
import router from 'next/router';
import { useState } from 'react';
import { getTranscriptByTranscriptId } from '../../database/transcripts';
import styles from './page.module.scss';

type Props = {
  transcripts: Transcript[];
};

// props are all transcripts
export default function GalleryPage(props: Props) {
  // const [transcripts, setTranscripts] = useState<Transcript[]>(
  //   props.transcripts,
  const router = useRouter();
  const transcriptId = props.transcripts.transcriptId;
  // console.log(transcriptId);

  const [error, setError] = useState<string>();

  return (
    <div className={styles.buttonAndIdContainer}>
      <div>
        <span>{props.transcripts.id}</span>
      </div>
      <button
        onClick={async () => {
          const response = await fetch(`/api/transcript/${transcriptId}`, {
            method: 'DELETE',
          });
          // console.log(props.transcripts);

          const data = await response.json();
          // console.log(data);

          if (data.error) {
            setError(data.error);
            return;
          }

          router.refresh();
        }}
      >
        Delete
      </button>
    </div>
  );
}
