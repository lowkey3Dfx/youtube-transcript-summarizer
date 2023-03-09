import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';

export const metadata = {
  title: {
    default: 'youtube-transcript-summarizer',
    template: '%s | youtube-transcript-summarizer',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

type LayoutProps = {
  children: ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: LayoutProps) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  // if user is not undefined, the person is logged in
  // if user is undefined, the person is logged out

  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <div>
              <Link href="/">Home</Link>
              <Link href="/transcript">Transcript</Link>

              {user ? (
                <>
                  <Link href="/gallery">Gallery</Link>
                  <Link href="/logout" prefetch={false}>
                    Logout
                  </Link>
                  <Link href={`/profile/${user.username}`}>
                    {user.username}
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register">Sign up</Link>
                  <Link href="/login">Login</Link>
                </>
              )}
            </div>
          </nav>
        </header>
        {children}
        <footer>
          <p>&copy; 2023 Youtube Transcript Summarizer</p>
        </footer>
      </body>
    </html>
  );
}
