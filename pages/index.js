import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout';
import Header from '../components/header';
import Footer from '../components/footer';
import SignupForm from '../components/signupForm';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>Luke Prosser</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Header />
        <main>
          <section className='gap-3 my-12 md:flex md:items-center'>
            <div>
              <h1 className='py-4 text-6xl font-medium'>Hi, I&apos;m Luke.</h1>
              <p className='mb-6 text-4xl'>
                I&apos;m a Web Developer based in Wales, UK.
              </p>
              <p className='text-xl font-light'>
                I enjoy building websites and applications using full-stack
                JavaScript techologies like React and Node.js, and sharing what
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
          <section>
            <h2 className='text-4xl'>Latest from the blog</h2>
            <ul>
              {allPostsData.map(({ id, date, title }) => (
                <li key={id}>
                  {title}
                  <br />
                  {id}
                  <br />
                  {date}
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </Layout>
    </div>
  );
}
