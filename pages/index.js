import Head from 'next/head';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout';
import SignupForm from '../components/signupForm';
import PostsIndex from '../components/postsIndex';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Luke Prosser</title>
        <meta name='description' content='Luke Prosser - Web Developer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <main>
          <section className='gap-3 my-12 md:flex md:items-center'>
            <div>
              <h1 className='py-4 text-5xl font-medium sm:text-6xl'>
                Hi, I&apos;m Luke.
              </h1>
              <p className='mb-6 text-2xl sm:text-4xl'>
                I&apos;m a Web Developer based in Wales, UK.
              </p>
              <p className='text-lg font-light sm:text-xl'>
                I enjoy building websites and applications using full-stack
                JavaScript technologies like React and Node.js, and sharing what
                I learn along the way.
              </p>
            </div>
            <SignupForm />
            <div
              className='ml-form-embed'
              data-account='1301826:u6l0i3y6u9'
              data-form='1755242:v5e9n4'
            ></div>
          </section>
          <section className='mt-20'>
            <h2 className='text-3xl sm:text-4xl'>Latest from the blog</h2>
            <PostsIndex posts={posts} />
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      posts: allPostsData.map((post) => post.meta),
    },
  };
}
