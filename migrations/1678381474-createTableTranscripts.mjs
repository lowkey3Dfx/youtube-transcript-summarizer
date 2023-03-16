export async function up(sql) {
  await sql`
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
  video_description varchar(4000),
  thumbnail varchar(80),
  videoTags varchar(400)
  )
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE transcripts
`;
}
