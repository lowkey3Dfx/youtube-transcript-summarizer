import { execa } from 'execa';

export async function getVideoId() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/video`;
    const response = await fetch(url);
    // console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    // returning videoId from response
    return data.videoId;
  } catch (error) {
    console.error('There was a error:', error);
  }
}

export async function runPythonScript(videoId: string) {
  const command = ['app/getTranscript/tget.py', videoId];
  const { stdout } = await execa('python3', command);

  // console.log(stdout);
  return stdout;
}
