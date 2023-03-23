import { NextResponse } from 'next/server';

// GET request
export async function GET(request: Request) {
  // tasks to get videoId
  const videoId = '03iSjMQ3a1U';

  return NextResponse.json({ videoId: videoId });
}

// // POST request
export async function POST(request: Request) {
  // tasks to get videoId

  return NextResponse.json({ videoId: videoId });
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
