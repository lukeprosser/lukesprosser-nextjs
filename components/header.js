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
    <header className='flex justify-between py-4'>
      <Link href='/'>
        <a className='text-xl tracking-wide'>
          luke<span className='font-semibold'>prosser</span>
        </a>
      </Link>
      {renderThemeChanger()}
    </header>
  );
}
