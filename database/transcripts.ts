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
export const getTranscripts = cache(async () => {
  const transcripts = await sql<Transcript[]>`
    SELECT * FROM transcripts
  `;

  return transcripts;
});

// get transcript by user_id
// export const getTranscriptByUserId =
export const getTranscriptByUserId = cache(async (userId: number) => {
  const [transcript] = await sql<Transcript[]>`
  SELECT
    *
  FROM
    transcripts
  WHERE
    user_id = ${userId}
  `;
  return transcript;
});

export const getTranscriptsByUserIdAndTranscriptId = cache(
  async (userId: number, transcriptId: string) => {
    const transcripts = await sql<Transcript[]>`
    SELECT *
    FROM transcripts
    WHERE user_id = ${userId} AND transcript_id = ${transcriptId}
  `;

    return transcripts;
  },
);

// get transcript by transcript_id which is also videoId
export const getTranscriptByTranscriptId = cache(
  async (transcriptId: string) => {
    const [transcript] = await sql<Transcript[]>`
    SELECT
      *
    FROM
      transcripts
    WHERE
      transcript_id = ${transcriptId}
  `;
    return transcript;
  },
);

// get single transcript by transcriptId
// export const getTranscriptById = cache(async (transcriptId: string) => {
//   const [transcript] = await sql<Transcript[]>`
//     SELECT
//       *
//     FROM
//       transcripts
//     WHERE
//       id = ${transcriptId}
//   `;
//   return transcript;
// });

// this will be a POST method
export const createTranscript = cache(
  async (
    userId: number,
    transcriptId: string,
    fullTranscript: string,
    summary: string,
    channelId: string,
    channelTitle: string,
    channelLogo: string,
    videoTitle: string,
    videoDescription: string,
    thumbnail: string,
    videotags: string,
  ) => {
    const [transcript] = await sql<Transcript[]>`
      INSERT INTO transcripts
          (user_id, transcript_id, full_transcript, summary, channel_id, channel_title, channel_logo, video_title, video_description, thumbnail, videotags)
      VALUES
          (${userId}, ${transcriptId}, ${fullTranscript}, ${summary}, ${channelId}, ${channelTitle}, ${channelLogo}, ${videoTitle}, ${videoDescription}, ${thumbnail}, ${videotags})
      RETURNING
          *
          `;
    return transcript;
  },
);

export const deleteTranscriptById = cache(async (transcriptId: string) => {
  const [transcript] = await sql<[Transcript | undefined]>`
    DELETE FROM
      transcripts
    WHERE
      transcript_id = ${transcriptId}
    RETURNING *
  `;
  return transcript;
});
