import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';

export const metadata = {
  title: {
    default: 'animals4everyone',
    template: '%s | animals4everyone',
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
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <div>
              <Link href="/">Home</Link>
              <Link href="/transcript">Gallery</Link>
              <Link href="/register">Sign up</Link>
              <Link href="/login">Login</Link>
              <Link href="/logout" prefetch={false}>
                Logout
              </Link>
              {user && user.username}
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
