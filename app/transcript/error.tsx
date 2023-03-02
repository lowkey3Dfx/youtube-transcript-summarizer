'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      Not loading: {error.message}
      <button onClick={() => reset()}>Reload</button>
    </div>
  );
}
