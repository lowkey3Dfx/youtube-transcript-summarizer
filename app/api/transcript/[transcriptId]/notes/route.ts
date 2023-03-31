import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { insertNotes } from '../../../../../database/notes';

export async function GET(request: Request) {
  // task

  return NextResponse.json({ response: 'First note taken' });
}

// POST request
export const POST = async (request: NextRequest) => {
  // 1. validate the data / does the body contain what you want
  const body = await request.json();
  console.log('post body marker', body);
  const result = body;

  // if (!result.userId || !result.transcriptId) {
  //   return NextResponse.json(
  //     { errors: [{ message: 'input empty' }] },
  //     { status: 400 },
  //   );
  // }

  // 2. check if user exists / if not then redirect to login
  // 2.a compare the username with the database
  // const transcriptWithUserId = await getTranscriptsByUserIdAndTranscriptId(
  //   result.userId,
  //   result.transcriptId,
  // );

  // if (transcriptWithUserId.length > 0) {
  //   return NextResponse.json(
  //     { errors: [{ message: 'Transcript exists in Gallery' }] },
  //     { status: 400 },
  //   );
  // }

  // 3. create transcript
  const newNote = await insertNotes(result.savedNotes, result.transcriptId);

  if (!newNote) {
    return NextResponse.json(
      { error: [{ message: 'Note creation failed' }] },
      { status: 500 },
    );
  }

  // 4. return the transcript / close the cycle
  // console.log('new Transcript', newTranscript);
  return NextResponse.json(newNote);
};
