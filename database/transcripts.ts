import { cache } from 'react';
import { sql } from './connect';

// export type Transcript = {
//   id: number;
//   transcriptId: string;
//   userId: string;
//   fullTranscript: string;
//   summary: string;
//   channelName: string;
//   channelLogo: string;
//   videoTitle: string;
//   thumbnail: string;
// };

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
  videotags: string;
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
export async function getTranscriptByUserId(userId: number) {
  const [transcript] = await sql<Transcript[]>`
  SELECT
    *
  FROM
    transcripts
  WHERE
    user_id = ${userId}
  `;
  return transcript;
}

// get transcript by user_id
// export const getTranscriptByUserId =
export async function getTranscriptByTranscriptId(transcriptId: string) {
  const [transcript] = await sql<Transcript[]>`
    SELECT
      *
    FROM
      transcripts
    WHERE
      transcriptId = ${transcriptId}
  `;
  return transcript;
}

// get single transcript by transcriptId
export const getTranscriptById = cache(async (transcriptId: string) => {
  const [transcript] = await sql<Transcript[]>`
    SELECT
      *
    FROM
      transcripts
    WHERE
      id = ${transcriptId}
  `;
  return transcript;
});

export async function createTranscript(
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
) {
  const [transcript] = await sql<Transcript[]>`
  INSERT INTO transcripts
        (user_id, transcript_id, full_transcript, summary, channel_id, channel_title, channel_logo, video_title, video_description, thumbnail, videoTags)
      VALUES
        (${userId}, ${transcriptId}, ${fullTranscript}, ${summary}, ${channelId}, ${channelTitle}, ${channelLogo}, ${videoTitle}, ${videoDescription}, ${thumbnail}, ${videotags})
      RETURNING
        *
  `;
  return transcript;
}
