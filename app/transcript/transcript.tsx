// 'use client';

// import { redirect, useRouter } from 'next/navigation';
// import React, { ReactNode, useState } from 'react';
// import YouTube from 'react-youtube';
// import { TranscriptResponseBodyPost } from '../api/transcript/route';
// import styles from './page.module.scss';

// type Props = {
//   children: ReactNode;
// };

// // get video from url using react-youtube module
// export default function GetVideo({ children }: Props) {
//   const [input, setInput] = useState('');
//   const [url, setUrl] = useState('false');
//   const [videoId, setVideoId] = useState('');
//   const [videoTitle, setVideoTitle] = useState('');
//   const [videoDescription, setVideoDescription] = useState('');
//   const [channelId, setChannelId] = useState('');
//   const [channelTitle, setChannelTitle] = useState('');
//   const [thumbnail, setThumbnail] = useState('');
//   const [videoTags, setVideoTags] = useState('');
//   const [transcriptId, setTranscriptId] = useState(videoId);

//   const userId = 4;
//   const channelLogo = 'channel logo';
//   const fullTranscript = 'full Transcript';
//   const summary = 'summary';
//   const router = useRouter();

//   function handleChange(e: any) {
//     console.log(e.target.value);
//     // setId to videoId extracting from Url
//     setVideoId(e.target.value.split('v=')[1]);
//     // show user url inside input field
//     setInput(e.target.value);
//   }

//   const opts = {
//     height: '390',
//     width: '640',
//     playerVars: {
//       // https://developers.google.com/youtube/player_parameters
//     },
//   };

//   async function getYtFetch() {
//     try {
//       // Check if file exists
//       if (videoId !== '') {
//         setUrl(videoId);

//         // fetch youtube data with API
//         const data = await fetch(
//           `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
//         );

//         const res = await data.json();
//         const videoRes = res.items[0].snippet;
//         setVideoTitle(videoRes.title);
//         setVideoDescription(videoRes.description);
//         setChannelId(videoRes.channelId);
//         setChannelTitle(videoRes.channelTitle);
//         setThumbnail(videoRes.thumbnails.standard.url);
//         setVideoTags(videoRes.tags);
//         setTranscriptId(videoId);

//         router.refresh();
//       } else {
//         return undefined;
//       }
//     } catch (err) {
//       console.error(err);
//       return undefined;
//     }
//   }

//   return (
//     <div className="urlInput">
//       <input
//         id="url"
//         onChange={handleChange}
//         value={input}
//         required
//         placeholder="URL..."
//       />
//       <button onClick={getYtFetch}>Go</button>
//       <button>Clear</button>
//       <button
//         onClick={async () => {
//           const response = await fetch('/api/transcript', {
//             method: 'POST',
//             body: JSON.stringify({
//               userId,
//               transcriptId,
//               fullTranscript,
//               summary,
//               channelId,
//               channelTitle,
//               channelLogo,
//               videoTitle,
//               videoDescription,
//               thumbnail,
//               videoTags,
//             }),
//           });

//           const data = await response.json();
//           console.log(data);

//           if (data.error) {
//             setError(data.error);
//             return;
//           }
//           // you should use this
//           // router.refresh();

//           // setAnimals([...animals, data.animal]);
//         }}
//       >
//         Add to Gallery
//       </button>
//       {url === videoId ? (
//         <div>
//           <div>
//             <p>{videoTitle}</p>
//             <p>{videoId}</p>
//             <p>Channel: {channelTitle}</p>
//             <p>Thumbnail url: {thumbnail}</p>

//             <p>{videoDescription}</p>
//             <p>Channel ID: {channelId}</p>
//             <p>Video tags: {videoTags}</p>
//             <img src={thumbnail} alt="thumbnail" height={480} width={640} />
//           </div>

//           <div>
//             <YouTube videoId={videoId} opts={opts} />
//           </div>
//         </div>
//       ) : undefined}
//     </div>
//   );
// }
// // onClick={async () => {
// //   const response = await fetch('/api/transcript', {
// //     method: 'POST',
// //     body: JSON.stringify({
// //       userId,
// //       videoId,
// //       video.publishedAt,
// //       video.description,
// //       video.channelId,
// //       video.channelTitle,
// //       video.thumbnails.standard.url,
// //       video.title,
// //       video.description,
// //       video.thumbnails.standard.url,
// //       video.tags,
// //     }),
// //   });

// //   const data = await response.json();
// //   console.log(data);

// //   if (data.error) {
// //     setError(data.error);
// //     return;
// //   }
// // you should use this
// // router.refresh();

// // setAnimals([...animals, data.animal]);
// // }}
