import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

export default function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className='w-7 h-7'
          role='button'
          onClick={() => setTheme('light')}
        />
      );
    } else {
      return (
        <MoonIcon
          className='w-7 h-7'
          role='button'
          onClick={() => setTheme('dark')}
        />
      );
    }
  };

  return (
    <header className='flex justify-between py-6 my-4'>
      <div>
        <Link href='/'>
          <a className='text-2xl tracking-wide'>
            luke<span className='font-semibold'>prosser</span>
          </a>
        </Link>
      </div>
      <div className='flex items-center gap-8'>
        <Link href='/blog'>
          <a className='text-lg font-light tracking-wide hover:text-indigo-500 dark:hover:text-indigo-300'>
            Blog
          </a>
        </Link>
        {renderThemeChanger()}
      </div>
    </header>
  );
}
