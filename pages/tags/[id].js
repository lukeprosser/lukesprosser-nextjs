import Head from 'next/head';
import Layout from '../../components/layout';

export default function Tag() {
  const id = 'javascript';
  return (
    <Layout>
      <Head>
        <title>Tag: {id}</title>
      </Head>
      <h1>Tag: {id}</h1>
    </Layout>
  );
}
