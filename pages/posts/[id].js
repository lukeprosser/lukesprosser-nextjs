import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({
  postData: { id, title, cover_image, image_alt, tags, contentHtml },
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article className='mx-auto prose dark:prose-invert'>
        <Image
          src={`/images/posts/${id}/${cover_image}`}
          alt={image_alt}
          width={1280}
          height={853}
        />
        <h1 className='mt-6'>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
