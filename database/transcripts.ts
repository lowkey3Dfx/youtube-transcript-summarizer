import { cache } from 'react';
import { sql } from './connect';

export type Transcript = {
  transcriptId: string;
  userId: string;
  fullTranscript: string;
  summary: string;
  channelName: string;
  channelLogo: string;
  videoTitle: string;
  thumbnail: string;
};

// get all transcripts
export const getTranscripts = cache(async () => {
  const transcripts = await sql<Transcript[]>`
    SELECT * FROM transcripts
  `;

  return transcripts;
});
