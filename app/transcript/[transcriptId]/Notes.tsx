'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export default function Notes(props: Props) {
  const [inputValue, setInputValue] = useState<string>('');
  const router = useRouter();
  // const [userNotes, setUserNotes] = useState([]);

  // userNotes need to be a array of objects for map to work
  const userNotes = props.params.getNotes;
  const transcriptId = props.params.transcriptId;
  const savedNotes = inputValue;

  async function postNotes() {
    try {
      const response = await fetch(`/api/transcript/${transcriptId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savedNotes,
          transcriptId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post note data');
      }
    } catch (err) {
      console.error(err);
      setError('Error ');
    }
    router.refresh();
  }

  return (
    <div className={styles.notesMainDiv}>
      <input
        value={inputValue}
        placeholder="Add a note"
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />
      <button onClick={postNotes}>Add Note</button>

      <div>
        {userNotes.map((note) => (
          <div key={note.id}>
            <input value={note} />

            <button
              onClick={async () => {
                const response = await fetch(
                  `/api/transcripts/${transcriptId}/notes`,
                  {
                    method: 'DELETE',
                  },
                );

                const data = await response.json();
                console.log(data);

                if (data.error) {
                  setError(data.error);
                  return;
                }

                // router.refresh();
              }}
            >
              Delete Note
            </button>
            <button>Edit Note</button>
          </div>
        ))}
      </div>
    </div>
  );
}
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
