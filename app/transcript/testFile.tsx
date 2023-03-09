// export const { spawn } = require('node:child_process');

// const childPython = spawn('python', ['--version']);

// childPython.stdout.on('data', (data: any) => {
//   console.log(`stdout: ${data}`);
// });

// childPython.stderr.on('data', (data: any) => {
//   console.error(`stderr: ${data}`);
// });

// childPython.on('close', (code: any) => {
//   console.log(`child process exited with code ${code}`);
// });

import { exec } from 'child_process';

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
