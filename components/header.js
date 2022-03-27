import Link from 'next/link';
import Image from 'next/image';
import moon from '../public/images/moon-solid.svg';

export default function Header() {
  return (
    <header className='flex justify-between py-4'>
      <Link href='/'>
        <a className='text-xl tracking-wide'>
          luke<span className='font-semibold'>prosser</span>
        </a>
      </Link>
      <Image src={moon} alt='Moon icon' width='24px' height='24px' priority />
    </header>
  );
}
