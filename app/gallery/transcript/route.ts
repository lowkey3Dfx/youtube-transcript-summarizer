import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
  transcript_id: string;
  userId: string;
  full_transcript: string;
  summary: string;
  channel_name: string;
  channel_logo: string;
  video_title: string;
  thumbail: string;
};

export async function POST(request: Request) {
  // tasks

  return NextResponse.json({ response: 'This is a post request' });
}
