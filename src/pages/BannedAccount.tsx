import React from 'react';
import '../styles/banned-account.scss';

const bannedRows = [
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Fraudulent Conduct', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
  ['36996389', 'N*****9', 'Child Abuse', '2025/10/29'],
];

const BannedAccount: React.FC = () => {
  const storeButton = (type: 'google' | 'apple') => {
    const isGoogle = type === 'google';
    return (
      <a
        href={isGoogle ? 'https://play.google.com/store/apps/details?id=com.laachat.kugo' : '#'}
        target={isGoogle ? '_blank' : undefined}
        rel={isGoogle ? 'noopener noreferrer' : undefined}
        className="banned-store-button"
      >
        <img src={isGoogle ? '/images/banned/google-play.svg' : '/images/banned/app-store.svg'} alt="" />
        <span>{isGoogle ? 'Google Play' : 'AppStore'}</span>
      </a>
    );
  };

  return (
    <div className="banned-page">
      <div className="banned-page__bg" />

      <section className="banned-hero">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/banned/hero-mobile.png" />
          <img src="/images/banned/hero.png" alt="" className="banned-hero__image" />
        </picture>
        <div className="banned-hero__shade" />
        <div className="banned-hero__fade" />
        <div className="banned-hero__content">
          <h1>Banned Account</h1>
          <p>
            Milo APP is unwavering in its commitment to strictly combat and eliminate content that violates rules, particularly actions that can harm or infringe upon the rights and privacy of minors. We strive to create a healthy and safe social environment for our users. We fully understand the enormous challenges and substantial responsibilities this goal entails. We invite everyone to work alongside Milo in building a more harmonious and beautiful online community.
          </p>
        </div>
      </section>

      <main className="banned-content">
        <section className="banned-rich-text">
          <h2>Banned Account Notice</h2>
          <p className="banned-meta">
            <span>Last updated date: 2024-01-11</span>
            <span>Contact us: info@Milo.chat</span>
          </p>
          <h3>Below is a list of some of the banned user accounts：</h3>
        </section>

        <section className="banned-table" aria-label="Banned user accounts">
          <div className="banned-table__head">
            <span>UserID</span>
            <span>Nicname</span>
            <span>Banned Reson</span>
            <span>Banned Time</span>
          </div>
          <div className="banned-table__body">
            {bannedRows.map((row, index) => (
              <div className="banned-table__row" key={`${row.join('-')}-${index}`}>
                {row.map((cell) => <span key={cell + index}>{cell}</span>)}
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="banned-cta">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/banned/footer-bg-mobile.png" />
          <img src="/images/banned/footer-bg.png" alt="" className="banned-cta__image" />
        </picture>
        <div className="banned-cta__shade" />
        <div className="banned-cta__content">
          <p>Install now</p>
          <h2>
            <span className="desktop-line">Don&apos;t Miss Out</span>
            <span className="desktop-line">on The Fun</span>
            <span className="mobile-line">Chat Don&apos;t Miss Out on The Fun</span>
          </h2>
          <div className="banned-cta__buttons">
            {storeButton('google')}
            {storeButton('apple')}
          </div>
        </div>
        <footer className="banned-footer">
          <div className="banned-footer__logo">
            <img src="/images/logo.png" alt="Luvo" />
            <span>Luvo</span>
          </div>
          <p>Room 811, Beverly Commercial Building, 87-105 Chatham Road south,Tsim Sha Tsui, Kowloon, Hong Kong</p>
          <p>Copyright © 2025 Kika Pika Network Limited</p>
        </footer>
      </section>
    </div>
  );
};

export default BannedAccount;
