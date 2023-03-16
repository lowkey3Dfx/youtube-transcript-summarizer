'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TranscriptResponseBodyPost } from '../api/transcript/route';

export default function TranscriptForm() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/transcript', {
          method: 'POST',
          body: JSON.stringify({ url }),
        });

        const data: TranscriptResponseBodyPost = await response.json();
      }}
    >
      <input
        value={url}
        placeholder="URL..."
        onChange={(event) => setUrl(event.currentTarget.value)}
      />
      <button>Go</button>
      <button>Clear</button>
      <button>Add to Gallery</button>
    </form>
  );
}
