import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'HOME', path: '/home' },
  { name: 'TERMS', path: '/terms' },
  { name: 'PRIVACY', path: '/privacy-policy' },
  { name: 'CHILD SAFETY', path: '/child-protection' },
];

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const navBackgroundOpacity = isMenuOpen ? 0.95 : navOpacity;

  useEffect(() => {
    let animationFrame = 0;

    const updateNavOpacity = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setNavOpacity(Math.min(window.scrollY / 180, 0.95));
      });
    };

    updateNavOpacity();
    window.addEventListener('scroll', updateNavOpacity, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateNavOpacity);
    };
  }, []);

  return (
    <div className="home-v2">
      <style>
        {`
          .home-v2 {
            min-height: 100vh;
            overflow: hidden;
            background: #0e041a url('/images/home/about.jpg') center top / 100% auto no-repeat;
            color: #fff;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .home-v2__stage {
            position: relative;
            width: 100%;
            min-height: 1510px;
            margin: 0 auto;
          }

          .home-v2__line {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background: rgba(255,255,255,0.1);
          }

          .home-v2__nav {
            position: fixed;
            z-index: 50;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 80px;
            padding-right: 80px;
            border-bottom: 1px solid transparent;
            backdrop-filter: blur(4px);
            transition: background-color 160ms ease, border-color 160ms ease;
          }

          .home-v2__logo {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
          }

          .home-v2__logo img {
            width: 30px;
            height: 30px;
            border-radius: 10px;
          }

          .home-v2__logo span {
            color: #be4dff;
            font-size: 22px;
            font-weight: 800;
          }

          .home-v2__links {
            display: flex;
            align-items: center;
            gap: 48px;
          }

          .home-v2__links a {
            color: rgba(255,255,255,0.7);
            font-size: 16px;
            font-weight: 500;
            letter-spacing: -0.16px;
            text-decoration: none;
          }

          .home-v2__links a:first-child {
            color: #fff;
            font-weight: 700;
          }

          .home-v2__menu-button,
          .home-v2__mobile-menu {
            display: none;
          }

          .home-v2__copy {
            position: absolute;
            z-index: 3;
            left: max(80px, calc((100vw - 1440px) / 2 + 80px));
            top: 366px;
            width: 578px;
          }

          .home-v2__copy h1 {
            margin: 0;
            width: 578px;
            font-size: 64px;
            line-height: 1.08;
            font-weight: 800;
          }

          .home-v2__copy p {
            margin: 20px 0 0;
            width: 578px;
            color: rgba(255,255,255,0.7);
            font-size: 18px;
            line-height: 1.32;
            font-weight: 700;
          }

          .home-v2__play {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            height: 64px;
            margin-top: 30px;
            padding: 0 30px;
            border-radius: 999px;
            background: #fff;
            color: #303030;
            font-size: 18px;
            font-weight: 800;
            text-decoration: none;
          }

          .home-v2__play img {
            width: 22px;
            height: 22px;
          }

          .home-v2__cluster {
            position: absolute;
            z-index: 3;
            left: max(774px, calc((100vw - 1440px) / 2 + 774px));
            top: 320px;
            width: 515px;
            height: auto;
            pointer-events: none;
          }

          .home-v2__contact {
            position: absolute;
            z-index: 3;
            top: 1014px;
            left: 50%;
            width: 363px;
            transform: translateX(-50%);
            text-align: center;
          }

          .home-v2__contact h2 {
            margin: 0;
            font-size: 40px;
            line-height: 1;
            font-weight: 800;
          }

          .home-v2__contact p {
            margin: 32px 0 0;
            color: rgba(255,255,255,0.7);
            font-size: 16px;
            font-weight: 500;
          }

          .home-v2__contact a {
            display: block;
            margin-top: 24px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
          }

          .home-v2__email {
            color: #be4dff;
          }

          .home-v2__delete {
            color: rgba(255,255,255,0.7);
            text-decoration: underline !important;
          }

          .home-v2__footer {
            position: absolute;
            z-index: 3;
            top: 1438px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
          }

          .home-v2__footer a {
            color: #be4dff;
            text-decoration: underline;
          }

          @media (max-width: 767px) {
            .home-v2__stage {
              max-width: 375px;
              min-height: 1368px;
            }

            .home-v2 {
              background-size: auto 600px;
            }

            .home-v2__nav {
              position: fixed;
              height: 64px;
              padding: 0 24px;
            }

            .home-v2__logo {
              gap: 8px;
            }

            .home-v2__logo img {
              display: block;
              width: 32px;
              height: 32px;
              border-radius: 8px;
            }

            .home-v2__logo span {
              color: #9333ea;
              font-size: 24px;
              font-weight: 700;
            }

            .home-v2__links {
              display: none;
            }

            .home-v2__menu-button {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              color: #fff;
              background: transparent;
              border: 0;
              padding: 8px;
            }

            .home-v2__mobile-menu {
              position: fixed;
              z-index: 50;
              left: 0;
              right: 0;
              top: 64px;
              display: flex;
              flex-direction: column;
              gap: 0;
              padding: 16px 24px;
              border-top: 1px solid rgba(255,255,255,0.05);
              border-radius: 0;
              background: #0a0a0a;
            }

            .home-v2__mobile-menu a {
              display: block;
              padding: 12px 0;
              color: rgba(255,255,255,0.72);
              font-size: 14px;
              font-weight: 500;
              text-decoration: none;
            }

            .home-v2__mobile-menu a:first-child {
              color: #9333ea;
            }

            .home-v2__copy {
              left: 20px;
              top: 256px;
              width: 335px;
              text-align: center;
            }

            .home-v2__copy h1 {
              width: 335px;
              font-size: 36px;
              line-height: 1.16;
            }

            .home-v2__copy p {
              width: 335px;
              font-size: 16px;
              line-height: 1.25;
            }

            .home-v2__copy p .desktop-only {
              display: none;
            }

            .home-v2__play {
              height: 48px;
              padding: 0 24px;
              font-size: 16px;
            }

            .home-v2__play img {
              width: 20px;
              height: 20px;
            }

            .home-v2__cluster {
              left: 12px;
              top: 600px;
              width: 351px;
            }

            .home-v2__line--top {
              top: 919px !important;
            }

            .home-v2__line--bottom {
              top: 1253px !important;
            }

            .home-v2__contact {
              top: 993px;
              width: 335px;
            }

            .home-v2__footer {
              top: 1301px;
              font-size: 16px;
            }
          }
        `}
      </style>

      <div className="home-v2__stage">
        <div className="home-v2__line home-v2__line--top" style={{ top: 860 }} />
        <div className="home-v2__line home-v2__line--bottom" style={{ top: 1360 }} />

        <header
          className="home-v2__nav"
          style={{
            backgroundColor: `rgba(10, 10, 10, ${navBackgroundOpacity})`,
            borderColor: `rgba(255, 255, 255, ${navBackgroundOpacity * 0.06})`,
          }}
        >
          <Link to="/home" className="home-v2__logo" aria-label="Kugo home">
            <img src="/images/logo.png" alt="" />
            <span>Kugo</span>
          </Link>

          <nav className="home-v2__links">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.name}
              </Link>
            ))}
          </nav>

          <button type="button" className="home-v2__menu-button" aria-label="Toggle menu" onClick={() => setIsMenuOpen((value) => !value)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {isMenuOpen && (
          <nav className="home-v2__mobile-menu">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        <section className="home-v2__copy">
          <h1>Kugo-Video Chat & Meet</h1>
          <p>
            Connect with real people worldwide through private video conversations. Make meaningful connections
            <span className="desktop-only"> and discover new friends in a safe, intimate space.</span>
          </p>
          <a className="home-v2__play" href="https://play.google.com/store/apps/details?id=com.laachat.kugo" target="_blank" rel="noopener noreferrer">
            <img src="/images/home/google-play-icon.svg" alt="" />
            Google Play
          </a>
        </section>

        <img className="home-v2__cluster" src="/images/right_cluster_transparent2.png" alt="Kugo app video chat preview" />

        <section className="home-v2__contact">
          <h2>CONTACT</h2>
          <p>If you need assistance, please contact us at</p>
          <a className="home-v2__email" href="mailto:solli.devid@gmail.com">
            solli.devid@gmail.com
          </a>
          <Link className="home-v2__delete" to="/account-deletion">
            Account Deletion Request Form
          </Link>
        </section>

        <footer className="home-v2__footer">
          Copyright &copy; 2025 <Link to="/home">Kugo</Link> - All rights reserved
        </footer>
      </div>
    </div>
  );
};

export default Home;
