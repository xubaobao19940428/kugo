import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  const navLinks = [
    { name: 'HOME', path: '/home' },
    { name: 'TERMS', path: '/terms' },
    { name: 'PRIVACY', path: '/privacy-policy' },
    { name: 'CHILD SAFETY', path: '/child-protection' },
  ];

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {!isHomePage && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5">
          <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Kugo" className="h-8 w-8 rounded-lg" />
              <span className="text-2xl font-bold text-[#9333EA]">Kugo</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-[#9333EA]',
                    isLinkActive(link.path) ? 'text-[#9333EA]' : 'text-white/70'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#0a0a0a] border-t border-white/5 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'block py-3 text-sm font-medium transition-colors',
                    isLinkActive(link.path) ? 'text-[#9333EA]' : 'text-white/70'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      )}

      <main className={isHomePage ? '' : 'pt-16'}>
        <Outlet />
      </main>

      {!isHomePage && (
        <footer className="py-8 px-6 border-t border-white/5 text-center">
          <p className="text-[#71717a] text-sm">
            Copyright &copy; 2025 <Link to="/" className="text-[#9333EA] hover:underline">Kugo</Link> - All rights reserved
          </p>
          <p className="text-[#52525b] text-xs mt-2">
            LAA APPAREL LIMITED, Rm 303 3/F ST GEORGE'S BLDG, 2 ICE HSE ST, Central, Hong Kong
          </p>
        </footer>
      )}
    </div>
  );
};

export default Layout;
