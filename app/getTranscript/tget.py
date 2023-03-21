from youtube_transcript_api import YouTubeTranscriptApi
import os
import sys

videoUrl = '';
videoId = videoUrl.split('v=')[1];
# Captures output of subtitles
outls = []

output_dir = "app/getTranscript"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

tx = YouTubeTranscriptApi.get_transcript(videoId, languages=['en', 'de'])
for i in tx:
  outtxt = (i['text'])
  outls.append(outtxt)



  with open(os.path.join(output_dir, 'op.txt'), 'a') as opf:
    opf.write(outtxt + "\n")


    # Start NLP stuff? natural language processing

    # from sklearn.feature_extraction.text import CountVectorizer
    # # Create a Vectorizer Object
    # vectorizer = CountVectorizer()

    # vectorizer.fit(outls)

    # # Printing the identified Unique words along with their indices

    # print('Vocabulary: ', vectorizer.vocabulary_)
