import Head from 'next/head';
import { getSortedPostsData } from '../../lib/posts';
import Layout from '../../components/layout';
import PostsIndex from '../../components/postsIndex';

export default function Tag({ id, posts }) {
  return (
    <>
      <Head>
        <title>Tag: {id}</title>
        <meta name='description' content='Tags' />
      </Head>
      <Layout>
        <main>
          <section className='mt-10'>
            <h1 className='text-2xl sm:text-3xl'>Tag: {id}</h1>
            <PostsIndex posts={posts} />
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  // Get all posts with selected tag
  const posts = getSortedPostsData().filter((post) =>
    post.meta.tags.includes(id)
  );

  return {
    props: {
      id,
      posts: posts.map((post) => post.meta),
    },
  };
}

export async function getStaticPaths() {
  const posts = getSortedPostsData();
  // Get all tags in single array
  const tags = posts.map((post) => post.meta.tags).flat();
  // Remove duplicate tags
  const tagSet = new Set(tags);
  // Convert back to array
  const paths = Array.from(tagSet).map((tag) => ({ params: { id: tag } }));

  return {
    paths,
    fallback: false,
  };
}
