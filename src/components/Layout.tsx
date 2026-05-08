import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const scrollPositions = useRef<Record<string, number>>({});
  const visitedPaths = useRef<Set<string>>(new Set());
  const isInitialMount = useRef(true);
  const isRestoringScroll = useRef(false);
  const isHome = location.pathname === '/home' || location.pathname === '/';
  const isBrandPage = isHome || location.pathname === '/privacy-policy' || location.pathname === '/terms' || location.pathname === '/child-protection' || location.pathname === '/banned-account';

  const navLinks = [
    { name: isBrandPage ? 'About' : 'HOME', path: '/home' },
    { name: isBrandPage ? 'Privacy' : 'PRIVACY', path: '/privacy-policy' },
    { name: isBrandPage ? 'User Agreement' : 'TERMS', path: '/terms' },
    { name: isBrandPage ? 'Children Safety' : 'CHILD SAFETY', path: '/child-protection' },
    { name: isBrandPage ? 'Banned Account' : 'BANNED ACCOUNT', path: '/banned-account' },
  ];

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        if (isRestoringScroll.current) {
          ticking = false;
          return;
        }

        const scrollTop = Math.max(
          window.scrollY,
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop,
          0
        );

        scrollPositions.current[location.pathname] = scrollTop;
        setShowScrollTop(scrollTop > 300);
        ticking = false;
      });

      ticking = true;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      visitedPaths.current.add(location.pathname);
      return;
    }

    isRestoringScroll.current = true;
    const currentPath = location.pathname;
    const savedPosition = scrollPositions.current[currentPath] || 0;

    const timer = window.setTimeout(() => {
      const top = visitedPaths.current.has(currentPath) ? savedPosition : 0;

      document.body.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;

      visitedPaths.current.add(currentPath);

      window.setTimeout(() => {
        isRestoringScroll.current = false;
        setShowScrollTop(top > 300);
      }, 100);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const scrollToTop = () => {
    const start = Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const duration = 650;
    const startTime = performance.now();
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const nextTop = start * (1 - easeOutCubic(progress));

      window.scrollTo(0, nextTop);
      document.documentElement.scrollTop = nextTop;
      document.body.scrollTop = nextTop;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen bg-[#0E041A] text-white">
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-sm',
        isBrandPage ? 'brand-layout-nav' : '',
        isBrandPage ? 'h-14 md:h-20 bg-transparent border-b-0' : 'bg-[#0a0a0a]/95 border-b border-white/5'
      )}>
        <div className={cn(
          'container mx-auto flex items-center justify-between',
          isBrandPage ? 'brand-layout-nav__inner' : '',
          isBrandPage ? 'h-14 max-w-none px-4 md:h-20 md:px-20' : 'h-16 max-w-7xl px-6'
        )}>
          <Link to="/" className={cn("flex items-center", isBrandPage ? "brand-layout-logo gap-[6.8px] md:gap-[10px]" : "gap-2")}>
            <img src="/images/logo.png" alt="Luvo" className={cn('rounded-lg', isBrandPage ? 'brand-layout-logo__mark h-5 w-5 md:h-[30px] md:w-[30px]' : 'h-8 w-8')} />
            <span className={cn('font-bold', isBrandPage ? 'brand-layout-logo__text text-[16px] md:text-[22px] text-white font-medium' : 'text-2xl text-[#9333EA]')}>
              {isBrandPage ? 'Luvo' : 'Kugo'}
            </span>
          </Link>

          <div className={cn('hidden md:flex items-center', isBrandPage ? 'brand-layout-links gap-[48px]' : 'gap-8')}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  isBrandPage ? 'text-[16px] tracking-[-0.16px] transition-colors hover:text-white' : 'text-sm font-medium transition-colors hover:text-white',
                  isLinkActive(link.path)
                    ? (isBrandPage ? 'text-white font-semibold' : 'text-[#9333EA]')
                    : 'text-white/70'
                )}
              >
                {isBrandPage && link.name === 'User Agreement' ? 'User Agreeme' : link.name}
              </Link>
            ))}
            {isBrandPage && (
              <a
                href="https://play.google.com/store/apps/details?id=com.laachat.kugo"
                target="_blank"
                rel="noopener noreferrer"
                className="brand-layout-download ml-2 rounded-full bg-[#BE4DFF] px-[18px] py-[10px] text-[16px] font-semibold tracking-[-0.32px] text-white"
              >
                Download
              </a>
            )}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen && !isBrandPage ? <X size={24} /> : <Menu size={isBrandPage ? 20 : 24} />}
          </button>
        </div>

        {isMobileMenuOpen && isBrandPage && (
          <div className="md:hidden fixed left-4 right-4 top-4 rounded-xl bg-[#191919] p-[30px] shadow-2xl">
            <div className="flex h-[26px] items-center justify-between">
              <Link to="/" className="flex items-center gap-[9px]" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="h-[26px] w-[26px] rounded-md bg-[linear-gradient(134deg,#CE29E7_16%,#48B9FF_86%)]" />
                <span className="text-[20px] font-medium text-[#F1F2F4]">Luvo</span>
              </Link>
              <button className="text-white/80" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <div className="mt-[30px] flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[14px]">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'text-[16px] tracking-[-0.16px]',
                      isLinkActive(link.path) ? 'font-semibold text-white' : 'font-medium text-white/70'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name === 'User Agreement' ? 'User Agreeme' : link.name}
                  </Link>
                ))}
              </div>
              <a
                href="https://play.google.com/store/apps/details?id=com.laachat.kugo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-full items-center justify-center rounded-full bg-[#BE4DFF] text-[16px] font-semibold tracking-[-0.32px] text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download
              </a>
            </div>
          </div>
        )}

        {isMobileMenuOpen && !isBrandPage && (
          <div className="md:hidden bg-[#0E041A] border-t border-white/5 px-6 py-4">
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
                {isBrandPage && link.name === 'User Agreement' ? 'User Agreeme' : link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className={isBrandPage ? '' : 'pt-16'}>
        <Outlet />
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{ zIndex: 99999 }}
        className={cn(
          'fixed bottom-6 right-5 h-12 w-12 transition-all duration-300 hover:-translate-y-1 md:bottom-10 md:right-[68px] md:h-20 md:w-20',
          showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        <img src="/images/up.png" alt="" className="h-full w-full object-contain" />
      </button>

      {!isBrandPage && (
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
