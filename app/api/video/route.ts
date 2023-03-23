import { NextResponse } from 'next/server';
import { runPythonScript } from '../../../util/database';

// GET request
// export async function GET(request: Request) {
//   // tasks to get videoId
//   const videoId = 'n7rYcJbJq9w';
//   const fullTranscript = await runPythonScript(videoId);

//   return NextResponse.json({ fullTranscript: fullTranscript });
// }

// // POST request
export async function POST(request: Request) {
  // tasks to get videoId
  const body = await request.json();
  console.log('POST body', body.videoId);
  // const videoId =  body.videoId;
  const fullTranscript = await runPythonScript(body.videoId);

  return NextResponse.json({ fullTranscript: fullTranscript });
}
// export async function POST(request: Request) {
// // tasks to get videoId
// const response = await getVideoId() {
//   videoId: body.videoId;

// }
// if (!videoId) {
//   res.status(500).send({ errors: [{ message: 'videoId false' }] });
//   return;
// }

//   return NextResponse.json({ videoId: videoId });
// }

// basic example of a route
// export default function videoIdHandler(req, res) {
//   const { method } = req;
//   console.log('method', method);

//   switch (method) {
//     case 'GET':
//       // Get data
//       res.status(200).json({ name: 'John Doe' });
//       break;
//     case 'POST':
//       // Create data
//       res.status(200).json({ response: 'POST successful' });
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
