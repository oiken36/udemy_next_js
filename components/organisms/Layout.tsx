import Head from 'next/head';
import { ReactNode } from 'react';
import styles from './Layout.module.css';
import utilStyles from '/styles/utils.module.css';
import homeStyles from '/styles/Home.module.css';
import { isConstructorDeclaration } from 'typescript';
import Link from 'next/link';


const name = 'シャチ';

export const siteTitle = 'Next.js Blog';

type Props = {
  children: ReactNode;
  home: string | null;
};

const Layout = ({ children, home }: Props) => {
  console.log('⭐' + home);
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home === 'home' ? (
          <>
            <img
              className={`${utilStyles.borderCircleHeader} ${styles.headerHomeImage}`}
              src="/images/profile.png"
              alt="プロフィール"
            />
            <h1 className={`${utilStyles.heading2Xl}`}>{name}</h1>
          </>
        ) : (
          <>
            <img
              className={utilStyles.borderCircleHeader}
              src="/images/profile.png"
              alt="プロフィール"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <Link href="/">←Homeへ戻る</Link>
      )}
    </div>
  );
};

export default Layout;
