// REFERENCE FILE FOR EVENTUAL BLOG PAGE
import Head from 'next/head';
import { getSortedPostsData } from '../../lib/posts';
import Layout from '../../components/layout';
import PostsIndex from '../../components/postsIndex';
import Pagination from '../../components/pagination';

export default function Blog({ posts, currentPage, totalPages }) {
  return (
    <>
      <Head>
        <title>
          Blog - Page {currentPage} of {totalPages}
        </title>
        <meta name='description' content='Blog' />
      </Head>
      <Layout>
        <main>
          <section className='mt-10'>
            <h1 className='text-2xl sm:text-3xl'>
              Blog - Page {currentPage} of {totalPages}
            </h1>
          </section>
          <PostsIndex posts={posts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Replace with Headless CMS
  const pageInt = parseInt(page);
  const postLimit = 8;
  const index = pageInt === 1 ? 0 : (pageInt - 1) * postLimit;
  const allPostsData = getSortedPostsData();
  const totalPosts = allPostsData.length;
  const totalPages = Math.ceil(totalPosts / postLimit);

  return {
    props: {
      posts: allPostsData
        .map((post) => post.meta)
        .slice(index, index + postLimit),
      currentPage: pageInt,
      totalPosts,
      postLimit,
      totalPages,
    },
  };
}
