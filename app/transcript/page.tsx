import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
import styles from './page.module.scss';

import TranscriptForm from './TranscriptForm';

// Pages are Server Components by default
export default async function Page() {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if yes redirect to home
  // for example you may also check if session user is an admin role

  if (!session) {
    // if not logged in first has to log in and then redirect to transcript/ gallery page
    redirect('/login?returnTo=/transcript');
  }

  return (
    <div>
      <TranscriptForm />
    </div>
  );
}
