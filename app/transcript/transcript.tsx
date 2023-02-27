'use client';

import React, { useState } from 'react';
import YouTube from 'react-youtube';

export default function GetVideo() {
  const [id, setId] = useState('');

  function handleChange(e: any) {
    console.log(e.target.value);

    setId(e.target.value.split('v=')[1]);
  }
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };
  return (
    <div className="urlInput">
      <input onChange={handleChange} required placeholder="URL..." />

      <YouTube videoId={id} opts={opts} />
    </div>
  );
}
