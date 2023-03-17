'use client';

import { useState } from 'react';

// props are all transcripts
export default function GalleryPage(props) {
  const [error, setError] = useState<string>();

  return (
    <div>
      <button
        onClick={async () => {
          console.log(props);
          const response = await fetch(
            `/api/transcript/${props.transcriptId}`,
            {
              method: 'DELETE',
            },
          );

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }

          // router.refresh();

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
