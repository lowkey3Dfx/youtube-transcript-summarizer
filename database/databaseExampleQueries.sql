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
(user_id, transcript_id , full_transcript, summary, channel_id, channel_title, channel_logo, video_title, video_description, thumbnail, videoTags)
VALUES(4,'8D9XnnjFGMs&t=13s','Looooooooooong TEXT','short TEXT','UCsBjURrPoezykLs9EqgamOA','Fireship','https://i.ytimg.com/vi/fi40FAD-eik/sddefault.jpg', 'GraphQL with Apollo Server 2.0','Learn how to build an API using GraphQL with Apollo Server 2.0, using Firestore as a backend data source.', 'https://i.ytimg.com/vi/8D9XnnjFGMs/sddefault.jpg', 'firebasewebdevapp developmenttypescriptjavascriptlessontutorialapollo serverapollo enginegraphqlgraph qlfirebase graphqlgraphql tutorialapollo server tutorialnodejsapollo nodegraphql firestorefirestoreapollo server 2'), (4,
'8I3NTE4cn5s&t=307s',
'Looooooooooong TEXT',
'short TEXT',
'UCgkx40oeL6X9l93iT0sHxgg',
'Codex Community',
'https://i.ytimg.com/vi/fi40FAD-eik/sddefault.jpg',
'How to use AI Art and ChatGPT to Create a Insane Web Designs',
'Learn how to use AI Art and ChatGPT to Create a Website without writing a single line of code! ⭐ Check out my Design UI / UX Course called Enhance UI ⭐',
'https://i.ytimg.com/vi/8I3NTE4cn5s/sddefault.jpg',
'ai web designweb designaiopenaimidjourneydalleai websiteai website designai uiai user interfaceai uxuimidjourney websitewebsite aiwebsite design aiweb design aiweb design midjourneychat gptchatgptai');
