import { Twitter, LinkedIn, GitHub } from '../components/icons';

export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <footer className='my-8 mb-4 text-center'>
      <div className='flex justify-center gap-6 py-4'>
        <a
          target='_blank'
          href='https://twitter.com/lukesprosser'
          rel='noopener noreferrer'
        >
          <Twitter />
        </a>
        <a
          target='_blank'
          href='https://www.linkedin.com/in/lukeprosser/'
          rel='noopener noreferrer'
        >
          <LinkedIn />
        </a>
        <a
          target='_blank'
          href='https://github.com/lukeprosser'
          rel='noopener noreferrer'
        >
          <GitHub />
        </a>
      </div>
      <p className='py-4 font-light'>&copy; Luke Prosser {year}</p>
    </footer>
  );
}
