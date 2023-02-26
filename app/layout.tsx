import Head from 'next/head';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
};

const Layout = ({ children, pageTitle }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/transcript">Transcript</a>
            </li>
          </ul>
        </nav>
      </body>
      {children}
      <footer>
        <p>&copy; 2023 Youtube Transcript Summarizer</p>
      </footer>
    </div>
  );
};

export default Layout;
