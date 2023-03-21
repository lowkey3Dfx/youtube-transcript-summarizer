import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createTranscript,
  deleteTranscriptById,
  getTranscriptByTranscriptId,
  getTranscriptByUserId,
  getTranscripts,
} from '../../../database/transcripts';

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
  videotags: z.string(),
});

// types of possible responses
export type TranscriptResponseBodyPost =
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
        videotags: string[];
      };
    };

// POST request
export const POST = async (request: NextRequest) => {
  // steps to create a transcript
  // 1. validate the data / does the body contain what you want
  const body = await request.json();
  // console.log(body);
  // const result = transcriptSchema.safeParse(body);
  const result = body;
  console.log('body', body);
  // console.log(result);

  // if (!result.success) {
  //   return NextResponse.json(
  //     {
  //       error: result.error.issues,
  //     },
  //     { status: 400 },
  //   );
  // }

  // check if the string is empty / could also check for transcript

  if (!result.userId || !result.transcriptId) {
    return NextResponse.json(
      { errors: [{ message: 'input empty' }] },
      { status: 400 },
    );
  }

  // 2. check if user exists / if not then redirect to login
  // 2.a compare the username with the database

  // checking if the transcript_id exist or not

  const transcript = await getTranscriptByTranscriptId(result.transcriptId);

  if (transcript) {
    return NextResponse.json(
      { errors: [{ message: 'Transcript exists in Gallery' }] },
      { status: 400 },
    );
  }

  // 3. create transcript
  const newTranscript = await createTranscript(
    result.userId,
    result.transcriptId,
    result.fullTranscript,
    result.summary,
    result.channelId,
    result.channelTitle,
    result.channelLogo,
    result.videoTitle,
    result.videoDescription,
    result.thumbnail,
    result.videotags,
  );

  if (!newTranscript) {
    return NextResponse.json(
      { error: [{ message: 'transcript creation failed' }] },
      { status: 500 },
    );
  }

  // 4. return the transcript / close the cycle
  console.log('new Transcript', newTranscript);
  return NextResponse.json(newTranscript);
};

// GET request
export const GET = async () => {
  // Extract transcript_id from query parameters

  // Fetch the transcript using its transcript_id
  const transcripts = await getTranscripts();

  // Check if transcript exists
  if (!transcripts) {
    return NextResponse.json(
      { errors: [{ message: 'Transcript not found' }] },
      { status: 404 },
    );
  }

  // Return the transcript data
  return NextResponse.json({ transcripts: transcripts });
};

export const DELETE = async (params, request: NextRequest) => {
  const transcriptId = params.transcriptId;
  console.log(params);

  if (!transcriptId) {
    return NextResponse.json(
      {
        error: 'Transcript id is not valid',
      },
      { status: 400 },
    );
  }

  const singleTranscript = await deleteTranscriptById(transcriptId);

  if (!singleTranscript) {
    return NextResponse.json(
      {
        error: 'Transcript not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ transcript: singleTranscript });
};
