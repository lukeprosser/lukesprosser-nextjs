import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex justify-between'>
      <Link href='/'>
        <a className='text-xl tracking-wide'>
          luke<span className='font-semibold'>prosser</span>
        </a>
      </Link>
      <div className='space-y-2'>
        <div className='w-8 h-0.5 bg-gray-600'></div>
        <div className='w-8 h-0.5 bg-gray-600'></div>
        <div className='w-8 h-0.5 bg-gray-600'></div>
      </div>
    </header>
  );
}
