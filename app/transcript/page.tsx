import { exec } from 'node:child_process';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
import styles from './page.module.scss';
import GetVideo from './transcript';

const fs = require('node:fs');

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

  // use 'readFileSync' method of the 'fs' module to read the file and return its contents as sting
  // const transcriptPath = 'app/getTranscript/op.txt';
  // const transcriptContent = fs.readFileSync(transcriptPath, 'utf8');

  function getFileContents(transcriptPath: string) {
    // function to run tget.py and generate text file with transcript
    function runPythonScript(): void {
      exec('python3 app/getTranscript/tget.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    }

    try {
      // Check if file exists
      if (fs.existsSync('app/getTranscript/op.txt')) {
        // Read file contents
        const contents = fs.readFileSync('app/getTranscript/op.txt', 'utf-8');
        return contents;
      } else {
        runPythonScript();
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  const fileContents = getFileContents('./op.txt');
  // console.log(fileContents); // Will log file contents or undefined if file doesn't exist

  return (
    <div>
      <h1>Transcript Page</h1>
      <GetVideo children={undefined} />

      <div className={styles.transcriptContainer}>
        <p>{fileContents}</p>
      </div>
    </div>
  );
}
