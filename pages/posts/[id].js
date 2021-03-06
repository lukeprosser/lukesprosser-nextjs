import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import Layout from '../../components/layout';
import SignupForm from '../../components/signupForm';
import InfoText from '../../components/infoText';
import { getAllPostIds, getPostData } from '../../lib/posts';
import 'highlight.js/styles/atom-one-dark.css';

export default function Post({ post: { meta, source } }) {
  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@lukesprosser' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.excerpt} />
        <meta
          name='twitter:image'
          content={`https://www.lukesprosser.com/_next/image?url=/images/posts/${meta.id}/${meta.cover_image}&w=3840&q=75`}
        />
      </Head>
      <article className='w-full mx-auto mb-10 prose dark:prose-invert dark:prose-a:prose-headings:text-gray-100 prose-a:prose-headings:text-gray-900 prose-a:no-underline prose-a:text-indigo-700 dark:prose-a:text-indigo-400 dark:hover:prose-a:text-indigo-300 hover:prose-a:text-indigo-500'>
        <h1 className='mt-6'>{meta.title}</h1>
        <Image
          src={`/images/posts/${meta.id}/${meta.cover_image}`}
          alt={meta.image_alt}
          width={1280}
          height={500}
          objectFit='cover'
        />
        <MDXRemote {...source} components={{ Link, Image, InfoText }} />
      </article>
      <SignupForm />
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
