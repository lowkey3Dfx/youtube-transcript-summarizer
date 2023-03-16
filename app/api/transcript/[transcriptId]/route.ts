import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createTranscript,
  getTranscriptByTranscriptId,
  getTranscriptByUserId,
  getTranscripts,
} from '../../../../database/transcripts';

// validate requestBody with zod
const transcriptSchema = z.object({
  user_id: z.number(),
  transcript_id: z.string(),
  full_transcript: z.string(),
  summary: z.string(),
  channel_id: z.string(),
  channel_title: z.string(),
  channel_logo: z.string(),
  video_title: z.string(),
  video_description: z.string(),
  thumbnail: z.string(),
  videoTags: z.string(),
});

// GET request
export const GET = async () => {
  // Extract transcript_id from query parameters

  // Fetch the transcript using its transcript_id
  const transcript = await getTranscripts();

  // Check if transcript exists
  if (!transcript) {
    return NextResponse.json(
      { errors: [{ message: 'Transcript not found' }] },
      { status: 404 },
    );
  }

  // Return the transcript data
  return NextResponse.json({ transcript: transcript });
};
