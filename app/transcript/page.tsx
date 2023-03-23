import { execa } from 'execa';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
// import { getVideoId } from '../../util/database';
import styles from './page.module.scss';
import GetVideo from './transcript';
import TranscriptForm from './TranscriptForm';

// Pages are Server Components by default
export default async function Page() {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if yes redirect to home
  // for example you may also check if session user is an admin role

  if (!session) {
    // if not logged in first has to log in and then redirect to transcript/ gallery page
    redirect('/login?returnTo=/transcript');
  }

  async function getVideoId() {
    try {
      const response = await fetch('http://localhost:3000/api/video');
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      // returning videoId from response
      return data.videoId;
    } catch (error) {
      console.error('There was a error:', error);
    }
  }

  const videoId = await getVideoId();
  // const videoId = 'dQw4w9WgXcQ';
  console.log(videoId);

  // await console standard output from python script and set ad fileContents
  async function runPythonScript(videoId: string) {
    const command = ['app/getTranscript/tget.py', videoId];
    const { stdout } = await execa('python3', command);

    // console.log(stdout);
    return stdout;
  }

  // run runPythonScript function and pass videoId variable as argument
  const fileContents = await runPythonScript(videoId);

  // console.log('fileContents: ', fileContents);

  return (
    <div>
      <div>
        {/* <GetVideo children={undefined} /> */}
        <TranscriptForm fileContents={fileContents} />
        <div>
          <div>{/* <p>{fileContents}</p> */}</div>
        </div>
      </div>
    </div>
  );
}
