from youtube_transcript_api import YouTubeTranscriptApi

videoUrl = 'https://www.youtube.com/watch?v=8D9XnnjFGMs';
videoId = videoUrl.split('v=')[1];

# Captures output of subtitles
outls = []

tx = YouTubeTranscriptApi.get_transcript('8D9XnnjFGMs', languages=['en', 'de'])
for i in tx:
  outtxt = (i['text'])
  outls.append(outtxt)

  with open('op.txt', 'a') as opf:
    opf.write(outtxt + "\n")

    # Start NLP stuff?

    # from sklearn.feature_extraction.text import CountVectorizer
    # # Create a Vectorizer Object
    # vectorizer = CountVectorizer()

    # vectorizer.fit(outls)

    # # Printing the identified Unique words along with their indices

    # print('Vocabulary: ', vectorizer.vocabulary_)
