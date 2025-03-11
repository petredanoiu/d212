'use client';

import { usePathname } from 'next/navigation';
import MenuLink from '../uicomponents/MenuLink';

type SubmenuProps = {
  listSubmenu: Array<{ id: number; title: string; href: string }>;
};

export default function Submenu({ listSubmenu }: SubmenuProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className='hidden md:flex items-center justify-between flex-1 px-8'>
        <ul className='flex items-center gap-2'>
          {listSubmenu.map((pagina) => (
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
      <div className='md:hidden  p-4'>
        <div className='flex flex-col h-full'>
          <ul className='space-y-4 mb-8'>
            {listSubmenu.map((pagina) => (
              <MenuLink
                key={pagina.id}
                title={pagina.title}
                href={pagina.href}
                isActive={isActive(pagina.href)}
                isMobile={true}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
