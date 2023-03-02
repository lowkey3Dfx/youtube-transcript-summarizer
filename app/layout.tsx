import Link from 'next/link';
import { ReactNode } from 'react';

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

export default function RootLayout({ children }: LayoutProps) {
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
              <Link href="/logout">Logout</Link>
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
