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
          シャチ（鯱、学名: Orcinus orca）は、哺乳綱鯨偶蹄目マイルカ科シャチ属の海獣[2]である。日本ではサカマタ（逆叉、逆戟）という別名もある[2]。シャチは、魚類全般、サメだけでなく、自分の倍以上の大きさであるヒゲクジラ亜目のうち最大のシロナガスクジラを含むクジラなどを群れで襲って食べる。寿命が長く、年長のメスを中心とする母系社会を形成する社会性を持つ動物          </p>
        </section>
      </Layout>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝 シャチブログ</h2>
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
