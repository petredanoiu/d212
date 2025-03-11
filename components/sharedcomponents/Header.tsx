'use client';

import {
  explicatieDeclaratie,
  numeDeclaratie,
  pagini,
} from '@/utils/nomenclatoare';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MenuLink from '../uicomponents/MenuLink';
import XmlButtons from '../uicomponents/XmlButtons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className='bg-white'>
      {/* Top line with Logo and XML buttons */}
      <div className='px-4 py-2 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Image
            src='/assets/anaf-logo_scut.png'
            alt='anaf logo'
            width={40}
            height={47}
            style={{ width: '40px', height: '47px' }}
            className='flex-shrink-0'
          />
          <h1 className='text-3xl font-semibold'>{numeDeclaratie}</h1>
          <p className='hidden md:block text-sm text-gray-500'>
            {explicatieDeclaratie}
          </p>
        </div>

        <div className='flex items-center gap-4'>
          {/* XML Buttons - visible only on desktop */}
          <div className='hidden md:block'>
            <XmlButtons />
          </div>
          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 hover:bg-gray-100 rounded-md'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation on second line */}
      <nav className='hidden md:block border-t'>
        <div className='px-4 py-2'>
          <ul className='flex items-center gap-2'>
            {pagini.map((pagina) => (
              <MenuLink
                key={pagina.id}
                title={pagina.title}
                href={pagina.href}
                isActive={isActive(pagina.href)}
                isMobile={false}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden fixed inset-0 top-[62px] bg-white z-50'>
          <div className='flex flex-col h-full'>
            <nav className='border-t'>
              <div className='p-4'>
                <ul className='space-y-4'>
                  {pagini.map((pagina) => (
                    <MenuLink
                      key={pagina.id}
                      title={pagina.title}
                      href={pagina.href}
                      isActive={isActive(pagina.href)}
                      isMobile={true}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  ))}
                </ul>
              </div>
            </nav>
            {/* XML Buttons in mobile menu */}
            <div className='mt-auto border-t p-4'>
              <XmlButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
