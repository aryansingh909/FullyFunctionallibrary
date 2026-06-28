'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programmes', label: 'Programmes' },
  { href: '/join-library', label: 'Join Library' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#0B3D91] shadow-lg' : 'bg-[#0B3D91]/95 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#F97316] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-400 transition-colors">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm sm:text-base tracking-tight">SRS Digital Library</div>
              <div className="text-blue-200 text-[10px] sm:text-xs font-medium hidden sm:block">Mangalayatan University Centre</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-white bg-white/20'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/enroll"
              className="ml-2 px-4 py-2 bg-[#F97316] text-white text-sm font-semibold rounded-lg hover:bg-orange-400 transition-colors shadow-sm"
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="lg:hidden p-2 text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-[#0B3D91] border-t border-blue-800 shadow-xl">
          <nav className="px-4 pt-3 pb-5 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                  pathname === link.href
                    ? 'text-white bg-white/20'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/enroll"
              className="mt-2 px-4 py-3 bg-[#F97316] text-white font-semibold rounded-lg hover:bg-orange-400 transition-colors text-center"
            >
              Enroll Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
