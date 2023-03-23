export async function getVideoId() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/video`;
    const response = await fetch(url);
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

// const response = await fetch('http://localhost:3000/api/video');
// console.log(url);
