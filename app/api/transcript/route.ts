import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getTranscriptByTranscriptId,
  getTranscriptByUserId,
} from '../../../database/transcripts';

// validate requestBody with zod
const transcriptSchema = z.object({
  user_id: z.string(),
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

// types of possible responses
export type TranscriptResponseBody =
  | { error: { message: string }[] }
  | {
      transcript: {
        user_id: number;
        transcript_id: string;
        full_transcript: string;
        summary: string;
        channel_id: string;
        channel_title: string;
        channel_logo: string;
        video_title: string;
        video_description: string;
        thumbnail: string;
        videoTags: string;
      };
    };

export const POST = async (request: NextRequest) => {
  // steps to create a transcript
  // 1. validate the data / does the body contain what you want
  const body = await request.json();
  console.log(body);

  const result = transcriptSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error.issues,
      },
      { status: 400 },
    );
  }
  // check if the string is empty / could also check for transcript
  if (!result.data.user_id || !result.data.transcript_id) {
    return NextResponse.json(
      { errors: [{ message: 'input empty' }] },
      { status: 400 },
    );
  }

  // 2. check if user exists / if not then redirect to login
  // 2.a compare the username with the database

  // checking if the transcript_id exist or not
  const transcript = await getTranscriptByTranscriptId(
    result.data.transcript_id,
  );

  if (transcript) {
    return NextResponse.json(
      { errors: [{ message: 'Transcript exists in Gallery' }] },
      { status: 400 },
    );
  }

  // 3. create transcript

  // 4. return the transcript / close the cycle
};
