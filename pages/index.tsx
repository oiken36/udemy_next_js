import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Layout, { siteTitle } from '@/components/organisms/Layout';
import utilStyles from '/styles/utils.module.css';
import homeStyles from '/styles/Home.module.css';
import { getPostsData } from '@/lib/post';
import { postData } from '@/lib/post';
import { Album, fetchAlbums } from '@/lib/AlbumList';

type allPostsData = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
};
// // SSR
// export const getServerSideProps = async (context) => {
//   const albums: Array<Album> = await fetchAlbums();
//   return {
//     props: {
//       albums,
//     },
//   };
// };

// SSG
export const getStaticProps = async () => {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
//const allPostsData = getStaticProps();

export default function Home({ allPostsData }:any) {
  return (
    <>
      <Layout home={'home'}>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>
            南 沙良（みなみ さら、2002年〈平成14年〉6月11日 -
            ）は、日本の女優、ファッションモデル。東京都出身。レプロエンタテインメント所属。第18回ニコラモデルオーディショングランプリ。元『nicola』専属モデル（「ニコモ」
          </p>
        </section>
      </Layout>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝南沙良ブログ</h2>
        <div className={homeStyles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }: any) => (
            <article key={`${id}`}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={homeStyles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}> {date}</small>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
