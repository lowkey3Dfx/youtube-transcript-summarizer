import { cache } from 'react';
import { sql } from './connect';

// this will be a direct representation of the table in the database
// has to be camelCase
export type Transcript = {
  id: number;
  userId: number;
  transcriptId: string;
  fullTranscript: string;
  summary: string;
  channelId: string;
  channelTitle: string;
  channelLogo: string;
  videoTitle: string;
  videoDescription: string;
  thumbnail: string;
  videotags: string[];
};

// get all transcripts
export const getUserNotesByUserIdAndTranscriptId = cache(
  async (transcriptId: string) => {
    const notes = await sql<Notes[]>`
    SELECT
     *
     FROM notes
     WHERE transcript_id = ${transcriptId}
  `;
    return notes;
  },
);

export const insertNotes = cache(
  async (savedNotes: string, transcriptId: string) => {
    const notes = await sql<Notes[]>`
    INSERT INTO notes (saved_notes, transcript_id)
    VALUES (${savedNotes}, ${transcriptId})
    RETURNING *
    `;
    return notes;
  },
);
