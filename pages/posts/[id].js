import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import Layout from '../../components/layout';
import InfoText from '../../components/infoText';
import { getAllPostIds, getPostData } from '../../lib/posts';
import 'highlight.js/styles/atom-one-dark.css';

export default function Post({ post: { id, meta, source } }) {
  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <article className='mx-auto prose dark:prose-invert'>
        <h1 className='mt-6'>{meta.title}</h1>
        <Image
          src={`/images/posts/${id}/${meta.image}`}
          alt={meta.image_alt}
          width={1280}
          height={500}
          objectFit='cover'
          className='rounded'
        />
        <MDXRemote {...source} components={{ Link, Image, InfoText }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { content, meta } = await getPostData(params.id);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
        remarkGfm,
        rehypeExternalLinks,
      ],
    },
  });

  return {
    props: {
      post: {
        id: params.id,
        meta,
        source: mdxSource,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
