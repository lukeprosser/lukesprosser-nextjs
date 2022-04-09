import Link from 'next/link';
import Image from 'next/image';

export default function PostsIndex({ posts }) {
  return (
    <ul>
      {posts.map(({ id, title, cover_image, image_alt, tags, excerpt }) => (
        <li
          key={id}
          className='pb-8 my-12 border-b-2 sm:grid sm:grid-cols-3 sm:gap-6'
        >
          <Link href={`/posts/${id}`}>
            <a>
              <Image
                src={`/images/posts/${id}/${cover_image}`}
                alt={image_alt}
                width={1280}
                height={853}
              />
            </a>
          </Link>
          <div className='mt-3 sm:mt-0 sm:col-span-2'>
            <h3 className='text-xl md:text-2xl'>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </h3>
            <div className='mt-2 text-xs tracking-widest md:text-sm lg:text-base'>
              {tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a className='mr-5 text-indigo-700 dark:font-medium hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'>
                    {tag.toUpperCase()}
                  </a>
                </Link>
              ))}
            </div>
            <p className='mt-6 font-light md:text-lg'>{excerpt}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
