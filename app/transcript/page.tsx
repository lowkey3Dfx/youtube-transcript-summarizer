import GetVideo from './transcript';
import TranscriptPage from './ytApiFetch';

// Pages are Server Components by default
export default function Page() {
  return (
    <GetVideo>
      <TranscriptPage />
    </GetVideo>
  );
}
