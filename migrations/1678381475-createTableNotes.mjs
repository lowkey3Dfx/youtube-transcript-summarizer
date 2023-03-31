export async function up(sql) {
  await sql`
  CREATE TABLE notes (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text varchar(10000),
  transcript_id varchar(60)
  )
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE notes
`;
}
