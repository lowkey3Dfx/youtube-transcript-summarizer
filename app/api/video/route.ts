import { NextRequest, NextResponse } from 'next/server';
import { Transcript } from '../../../database/transcripts';
import { runPythonScript } from '../../../util/database';

export type TranscriptResponseBodyPost =
  | {
      error: string;
    }
  | {
      Transcript: Transcript;
    };

// // POST request
export async function POST(
  request: NextRequest,
): Promise<NextResponse<TranscriptResponseBodyPost>> {
  const body = await request.json();
  const videoId = body.videoId;
  const fullTranscript = await runPythonScript(videoId);

  return new NextResponse(JSON.stringify({ fullTranscript }), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
}
