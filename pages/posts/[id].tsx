import Layout from '@/components/organisms/Layout';
import { getAllPostIds, getPostData } from '@/lib/post';
import utilStyles from '/styles/utils.module.css';
import Head from 'next/head';

export const getStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};

export const Post = ({ postData }: any) => {
  return (
    <Layout home={""}>
        <Head><title>{postData.title}</title></Head>
      <article >
        <h1 className={utilStyles.headingXl1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
        {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.blogConentHTML}}/>
      </article>      
    </Layout>
  );
};

export default Post;
