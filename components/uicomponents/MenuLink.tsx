'use client';

import Link from 'next/link';

type MenuLinkProps = {
  title: string;
  href: string;
  isActive: boolean;
  isMobile: boolean;
  setIsMenuOpen?: (value: boolean) => void;
};
export default function MenuLink({
  title,
  href,
  isActive,
  isMobile,
  setIsMenuOpen,
}: MenuLinkProps) {
  const getLinkClassName = () => {
    return `${
      isActive
        ? 'text-blue-600 border-b border-blue-200'
        : 'text-gray-700 hover:text-blue-600'
    } ${
      isMobile ? 'block py-2' : ''
    } px-3 py-2 text-sm font-medium transition-colors duration-200`;
  };

  return (
    <li>
      <Link
        href={href}
        className={getLinkClassName()}
        onClick={() => {
          if (isMobile && setIsMenuOpen) {
            setIsMenuOpen(false);
          }
        }}
      >
        {title}
      </Link>
    </li>
  );
}
