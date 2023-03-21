'use client';

import { useRouter } from 'next/navigation';
import router from 'next/router';
import { useState } from 'react';

type Props = {
  transcripts: Transcript[];
};

// props are all transcripts
export default function GalleryPage(props: Props) {
  // const [transcripts, setTranscripts] = useState<Transcript[]>(
  //   props.transcripts,
  const router = useRouter();

  const [error, setError] = useState<string>();

  console.log();

  return (
    <div>
      <button
        onClick={async () => {
          const response = await fetch(`/api/transcript/${props.transcripts}`, {
            method: 'DELETE',
          });
          console.log(response);

          const data = await response.json();
          console.log(data);

          if (data.error) {
            setError(data.error);
            return;
          }

          router.refresh();

          // setAnimals(
          //   animals.filter(
          //     (animalOnState) => animalOnState.id !== data.animal.id,
          //   ),
          // );
        }}
      >
        Delete
      </button>
    </div>
  );
}
