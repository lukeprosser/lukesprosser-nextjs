// REFERENCE FILE FOR EVENTUAL BLOG PAGE
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSortedPostsData } from '../../lib/posts';
import Layout from '../../components/layout';
import PostsIndex from '../../components/postsIndex';

export default function Blog({ posts, page, totalPages }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Blog - Page {page} of {totalPages}
        </title>
        <meta name='description' content='Blog' />
      </Head>
      <Layout>
        <main>
          <section className='mt-10'>
            <h1 className='text-2xl sm:text-3xl'>
              Blog - Page {page} of {totalPages}
            </h1>
          </section>
          <PostsIndex posts={posts} />
          <div className='flex justify-end gap-6'>
            {/* Make button a component with consistent styles */}
            {/* Props will need integer expression, disabled value */}
            <button
              onClick={() => router.push(`?page=${page - 1}`)}
              disabled={page <= 1}
              className='border-2 rounded px-4 py-2 disabled:bg-slate-200 disabled:text-gray-400'
            >
              Previous
            </button>
            {Array.from(Array(totalPages).keys()).map((pageNum) => (
              <button
                key={pageNum + 1}
                onClick={() => router.push(`?page=${pageNum + 1}`)}
              >
                {pageNum + 1}
              </button>
            ))}
            <button
              onClick={() => router.push(`?page=${page + 1}`)}
              disabled={page >= totalPages}
              className='border-2 rounded px-4 py-2 disabled:bg-slate-200 disabled:text-gray-400'
            >
              Next
            </button>
          </div>
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
      page: parseInt(page),
      totalPosts,
      postLimit,
      totalPages,
    },
  };
}
