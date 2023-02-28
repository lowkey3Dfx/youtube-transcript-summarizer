'use client';

import React, { ReactNode, useState } from 'react';
import YouTube from 'react-youtube';

type Props = {
  children: ReactNode;
};

export default function GetVideo({ children }: Props) {
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [updateUrl, setUpdateUrl] = useState(url);

  function handleChange(e: any) {
    console.log(e.target.value);
    // setId to videoId extracting from Url
    const videoId = e.target.value.split('v=')[1];
    // show user url inside input field
    setInput(e.target.value);
    // update url value to id
    setUpdateUrl(videoId);
  }

  const handleClick = () => {
    // store input field value
    setUrl(updateUrl);
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };
  return (
    <div className="urlInput">
      <input
        id="url"
        onChange={handleChange}
        value={input}
        required
        placeholder="URL..."
      />
      <button onClick={handleClick}>Submit</button>
      <div>
        {url !== input ? <YouTube videoId={url} opts={opts} /> : undefined}
        {children}
      </div>
    </div>
  );
}
