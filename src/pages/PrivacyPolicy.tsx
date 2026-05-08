import React, { useEffect } from 'react';
import { Apple } from 'lucide-react';
import siteCfg from '../data/siteCfg';
import '../styles/privacy.scss';

interface SiteConfig {
  privacy: {
    content: string;
  };
}

const PrivacyPolicy: React.FC = () => {
  const content = (siteCfg as SiteConfig).privacy?.content ?? '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const storeButton = (type: 'google' | 'apple') => {
    const isGoogle = type === 'google';
    return (
      <a
        href={isGoogle ? 'https://play.google.com/store/apps/details?id=com.laachat.kugo' : '#'}
        target={isGoogle ? '_blank' : undefined}
        rel={isGoogle ? 'noopener noreferrer' : undefined}
        className="inline-flex h-12 min-w-[165px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[16px] font-bold text-[#303030] transition-transform hover:-translate-y-0.5 md:h-16 md:min-w-[167px] md:px-[30px] md:text-[18px]"
      >
        {isGoogle ? (
          <img src="/images/privacy/google-play.svg" alt="" className="h-5 w-5 md:h-[22px] md:w-[22px]" />
        ) : (
          <Apple className="h-5 w-5 fill-black md:h-[22px] md:w-[22px]" />
        )}
        {isGoogle ? 'Google Play' : 'AppStore'}
      </a>
    );
  };

  return (
    <div className="privacy-policy-container overflow-hidden bg-[#0E041A] text-white">
      <div className="privacy-page-bg" />
      <section className="privacy-hero">
        <img src="/images/privacy/hero.jpg" alt="" className="privacy-hero__image" />
        <div className="privacy-hero__shade" />
        <div className="privacy-hero__fade" />
        <div className="privacy-hero__content">
          <h1>
            <span>Your Privacy Matters: </span>
            <span className="privacy-gradient-text">Understanding How We Protect Your Data</span>
          </h1>
          <p>
            We prioritize your privacy and security. This policy outlines how we collect, use, and safeguard your personal information, ensuring a trusted and secure experience on our platform. Your data is in safe hands with us.
          </p>
        </div>
      </section>

      <main className="privacy-policy-content" dangerouslySetInnerHTML={{ __html: content }} />

      <section className="privacy-cta">
        <img src="/images/privacy/footer-bg.jpg" alt="" className="privacy-cta__image" />
        <div className="privacy-cta__shade" />
        <div className="privacy-cta__content">
          <p>Install now</p>
          <h2>
            <span className="hidden md:block">Don&apos;t Miss Out</span>
            <span className="hidden md:block">on The Fun</span>
            <span className="md:hidden">Chat Don&apos;t Miss Out on The Fun</span>
          </h2>
          <div className="mt-[30px] flex flex-col items-center justify-center gap-4 md:flex-row">
            {storeButton('google')}
            {storeButton('apple')}
          </div>
        </div>
        <footer className="privacy-cta__footer">
          <div className="flex items-center gap-2 text-white">
            <img src="/images/logo.png" alt="Luvo" className="h-[30px] w-[30px] rounded-md" />
            <span className="text-[22px] font-medium">Luvo</span>
          </div>
          <p>Room 811, Beverly Commercial Building, 87-105 Chatham Road south,Tsim Sha Tsui, Kowloon, Hong Kong</p>
          <p>Copyright © 2025 Kika Pika Network Limited</p>
        </footer>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
