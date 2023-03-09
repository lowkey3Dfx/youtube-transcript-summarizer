-- CREATE TABLE transcripts (
--   transcriptId varchar(50),
--   userId varchar(50) NOT NULL,
--   fullTranscript varchar(20000),
--   summary varchar(2000),
--   channelName varchar(50),
--   channelLogo varchar(50),
--   videoTitle varchar(50),
--   thumbnail varchar(50)
-- );


CREATE TABLE transcripts (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id varchar(50),
  transcript_id varchar(60),
  full_transcript varchar(20000),
  summary varchar(4000),
  channel_id varchar(50),
  channel_title varchar(50),
  channel_logo varchar(80),
  video_title varchar(100),
  video_description varchar(400),
  thumbnail varchar(80),
  videoTags varchar(400)
);

INSERT INTO transcripts
VALUES(1,'varePWkGi8Y2',4,'Welcome to the future. This timeline is amazing! The global hyperloop network is finally complete. The bioengineered glow-in-the-dark Redwood Forest in the Sahara is a vacation paradise. And best of all, we have colonies throughout the Solar System. One thing that might surprise you about the future is that everyone still uses SQL.','Welcome to the future.','Channel Name', 'Channel Logo', 'video title', 'https://i.ytimg.com/vi/varePWkGi8Y/sddefault.jpg');
https://www.youtube.com/watch?v=varePWkGi8Y

INSERT INTO transcripts
VALUES(2, '8I3NTE4cn5s&t=306s',4, 'Full Transcript Text','Learn how to use AI Art and ChatGPT to Create a Website without writing a single line of code!','Codex Community', 'Channel Logo', 'How to use AI Art and ChatGPT to Create a Insane Web Designs', 'https://i.ytimg.com/vi/8I3NTE4cn5s/sddefault.jpg');
https://www.youtube.com/watch?v=8I3NTE4cn5s&t=306s
