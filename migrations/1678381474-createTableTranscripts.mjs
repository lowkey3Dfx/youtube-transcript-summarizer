export async function up(sql) {
  await sql`
  CREATE TABLE transcripts (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id varchar(50),
  transcript_id varchar(60),
  full_transcript varchar(100000),
  summary varchar(20000),
  channel_id varchar(100),
  channel_title varchar(100),
  channel_logo varchar(300),
  video_title varchar(100),
  video_description varchar(6000),
  thumbnail varchar(300),
  videoTags varchar(1000)
  )
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE transcripts
`;
}
