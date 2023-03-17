import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import facebookLogo from '../public/facebook-7-xxl.png';
import instagramLogo from '../public/icons8-instagram-256.png';
import youtubeLogo from '../public/icons8-youtube-256.png';
import twitterLogo from '../public/twitter-xxl.png';
import styles from './page.module.scss';

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
      <body className={styles.body}>
        <header>
          <nav className={styles.navbar}>
            <div className={styles.container}>
              <div className={styles.navbar_left}>
                <p>Youtube Transcript Summarizer</p>
                <Link href="/">Home</Link>
              </div>

              <div className={styles.navbar_right}>
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
            </div>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>
          <div className={styles.footer_container}>
            <div className={styles.footer_left}>
              <p>&copy; 2023 Youtube Transcript Summarizer</p>
              <Link href="/footer/about">About</Link>
              <Link href="/footer/contact">Contact</Link>
              <Link href="/footer/terms">Terms & Conditions</Link>
            </div>
            <div className={styles.footer_right}>
              <Image
                src={facebookLogo}
                alt="Facebook Logo"
                height="32"
                width="32"
              />
              <Image
                src={instagramLogo}
                alt="Instagram Logo"
                height="36"
                width="36"
              />
              <Image
                src={twitterLogo}
                alt="Twitter Logo"
                height="32"
                width="32"
              />
              <Image
                src={youtubeLogo}
                alt="Youtube Logo"
                height="36"
                width="36"
              />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
