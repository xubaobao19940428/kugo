import React from 'react';
import { Apple, Video } from 'lucide-react';
import '../styles/home.scss';

const heroImage = '/images/home/hero.jpg';
const googleIcon = '/images/home/google-play.svg';

const profileImages = [
  '/images/home/profile-1.jpg',
  '/images/home/profile-2.jpg',
  '/images/home/profile-3.jpg',
  '/images/home/profile-4.jpg',
  '/images/home/profile-5.jpg',
  '/images/home/profile-6.jpg',
  '/images/home/profile-7.jpg',
  '/images/home/profile-8.jpg',
];

const featuredImages = [
  '/images/home/feature-left.jpg',
  '/images/home/feature-center.jpg',
  '/images/home/feature-right.jpg',
];

const people = [
  ['🍓Charlotte', '🇧🇷', 'Brazil'],
  ['Rebeca', '🇺🇸', 'America'],
  ['Vũ Mỹ Lệ', '🇻🇳', 'Vietnam'],
  ['Gabriel', '🇲🇽', 'Mexico'],
  ['Grace', '🇨🇴', 'Colombia'],
  ['Phạm Đức An', '🇻🇳', 'Vietnam'],
  ['Camila', '🇵🇹', 'Portugal'],
  ['Aarav', '🇮🇳', 'India'],
] as const;

const countries = [
  '🇺🇸 America',
  '🇳🇬 Nigeria',
  '🇵🇭 Philippines',
  '🇮🇩 Indonesia',
  '🇵🇹 Portugal',
  '🇮🇳 India',
  '🇲🇽 Mexico',
  '🇻🇳 Vietnam',
];

const storeLinks = {
  google: 'https://play.google.com/store/apps/details?id=com.laachat.kugo',
  appStore: '#',
};

function StoreButton({ type }: { type: 'google' | 'apple' }) {
  const isGoogle = type === 'google';
  return (
    <a
      href={isGoogle ? storeLinks.google : storeLinks.appStore}
      target={isGoogle ? '_blank' : undefined}
      rel={isGoogle ? 'noopener noreferrer' : undefined}
      className="home-store-button inline-flex h-12 min-w-[165px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[16px] font-bold text-[#303030] transition-transform hover:-translate-y-0.5 md:h-16 md:min-w-[167px] md:px-[30px] md:text-[18px]"
      aria-label={isGoogle ? 'Download on Google Play' : 'Download on AppStore'}
    >
      {isGoogle ? (
        <img src={googleIcon} alt="" className="home-store-button__icon h-5 w-5 md:h-[22px] md:w-[22px]" />
      ) : (
        <Apple className="home-store-button__icon h-5 w-5 fill-black md:h-[22px] md:w-[22px]" />
      )}
      {isGoogle ? 'Google Play' : 'AppStore'}
    </a>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="home-section-title mx-auto max-w-[920px] text-center font-bold">
      <p className="mb-4 text-[16px] md:text-[18px] capitalize text-white/70">{eyebrow}</p>
      <h2 className="text-[36px] leading-[1.22] md:text-[60px] md:leading-[1.2]">{title}</h2>
    </div>
  );
}

type Person = (typeof people)[number];

function ProfileCard({ image, person }: { image: string; person: Person }) {
  return (
    <article className="home-profile-card group relative h-[220px] overflow-hidden rounded-xl bg-white/10 md:h-[400px]">
      <img src={image} alt={person[0]} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="home-profile-card__online absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#0e041a]/30 px-1.5 py-1 text-[10px] font-medium text-[#2AEE7C] md:left-4 md:top-4 md:px-2 md:py-1 md:text-[18px]">
        <span className="h-2 w-2 md:h-3.5 md:w-3.5 rounded-full bg-[#2AEE7C]" />
        Online
      </div>
      <div className="home-profile-card__info absolute inset-x-0 bottom-0 flex h-12 md:h-[82px] items-center justify-between bg-gradient-to-t from-black/45 to-black/5 px-2 md:px-4">
        <div>
          <h3 className="text-[15px] md:text-[28px] font-bold leading-none">{person[0]}</h3>
          <p className="mt-1 flex items-center gap-1 text-[12px] md:text-[22px] text-white/90">
            <span>{person[1]}</span>
            {person[2]}
          </p>
        </div>
        <span className="home-profile-card__video grid h-[34px] w-[34px] place-items-center rounded-full bg-gradient-to-br from-[#BE4DFF] to-[#6C56FF] md:h-[62px] md:w-[62px]">
          <Video className="h-4 w-4 md:h-7 md:w-7 fill-white" />
        </span>
      </div>
    </article>
  );
}

function Showcase() {
  return (
    <div className="home-showcase relative mx-auto mt-12 h-[300px] max-w-[1120px] md:mt-24 md:h-[760px]">
      <p className="home-showcase__countries absolute left-4 top-16 z-20 rotate-[-20deg] text-[24px] font-bold md:left-10 md:top-24 md:text-[76px]">
        100+
        <span className="block text-[10px] text-white/50 md:text-[28px]">Countries</span>
      </p>
      <p className="home-showcase__downloads absolute bottom-8 right-4 z-20 text-[18px] font-bold md:bottom-20 md:right-20 md:text-[54px]">
        200K+
        <span className="block text-[7px] text-white/50 md:text-[18px]">Downloads</span>
      </p>
      <div className="home-showcase__image home-showcase__image--left absolute left-9 top-28 h-[165px] w-[91px] -rotate-12 overflow-hidden rounded-md md:left-[120px] md:top-[280px] md:h-[520px] md:w-[285px] md:rounded-2xl">
        <img src={featuredImages[0]} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="home-showcase__image home-showcase__image--center absolute left-1/2 top-20 z-10 h-[238px] w-[124px] -translate-x-1/2 overflow-hidden rounded-lg shadow-2xl md:top-[120px] md:h-[778px] md:w-[404px] md:rounded-3xl">
        <img src={featuredImages[1]} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="home-showcase__image home-showcase__image--right absolute right-9 top-28 h-[165px] w-[91px] rotate-[18deg] overflow-hidden rounded-md md:right-[120px] md:top-[260px] md:h-[520px] md:w-[285px] md:rounded-2xl">
        <img src={featuredImages[2]} alt="" className="h-full w-full object-cover" />
      </div>
      <span className="absolute bottom-7 left-0 text-5xl md:bottom-20 md:left-4 md:text-8xl">💕</span>
      <span className="absolute right-2 top-10 text-3xl md:right-20 md:top-20 md:text-7xl">😍</span>
      <span className="absolute right-5 top-48 text-3xl md:right-0 md:top-[420px] md:text-6xl">🔥</span>
    </div>
  );
}

const Home: React.FC = () => {
  return (
    <div className="home-page overflow-hidden bg-[#0E041A] text-white">
      <section className="home-hero relative flex min-h-[700px] items-center justify-center px-5 pt-20 md:min-h-[1066px]">
        <img src={heroImage} alt="" className="home-hero__image absolute inset-0 h-[600px] w-full object-cover md:h-[860px]" />
        <div className="home-hero__overlay absolute inset-0 h-[600px] bg-[linear-gradient(115deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,0)_58%)] md:h-[860px]" />
        <div className="home-hero__fade absolute left-0 right-0 top-[400px] h-[300px] bg-gradient-to-b from-[#0e041a00] to-[#0E041A] md:top-[486px] md:h-[580px]" />
        <div className="home-hero__content relative z-10 mx-auto mt-16 max-w-[1030px] text-center">
          <h1 className="text-[36px] font-bold leading-[1.22] md:text-[94px] md:leading-[1.2]">
            Chat <br /> With the World
          </h1>
          <p className="mx-auto mt-5 max-w-[698px] text-[16px] font-bold leading-normal text-white/70 md:text-[18px]">
            Luvo offers you the opportunity to video chat with fun new people around the world.
          </p>
          <div className="home-store-buttons mt-[30px] flex flex-col items-center justify-center gap-4 md:flex-row">
            <StoreButton type="google" />
            <StoreButton type="apple" />
          </div>
        </div>
      </section>

      <section className="home-explore px-4 pb-20 md:px-20 md:pb-28">
        <SectionTitle eyebrow="Explore a World of Fun" title="Join Luvo and Make Friends With People in Global Today!" />
        <Showcase />
      </section>

      <section className="home-chat relative py-20 md:py-28">
        <div className="home-chat__title-wrap px-4 md:px-20">
          <SectionTitle eyebrow="Video Chat Now" title="Don’t Miss a Beat" />
        </div>
        <div className="home-country-row mx-auto mt-8 flex max-w-[1326px] gap-3 overflow-x-auto px-4 pb-2 md:mt-16 md:justify-center md:gap-4 md:px-0">
          {countries.map((country) => (
            <span key={country} className="home-country-chip shrink-0 rounded-full border border-white/15 bg-white/15 px-4 py-2 text-sm text-white/70 md:px-6 md:py-4 md:text-2xl">
              {country}
            </span>
          ))}
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="home-profile-grid mx-auto mt-8 grid max-w-[1280px] grid-cols-2 gap-2.5 px-4 md:mt-12 md:grid-cols-4 md:gap-7 md:px-0">
            {people.map((person, index) => (
              <ProfileCard key={`${person[0]}-${index}`} image={profileImages[index]} person={person} />
            ))}
          </div>
          <div className="home-profile-fade pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[300px] bg-[linear-gradient(180deg,rgba(14,4,26,0)_0%,#0E041A_84.92%)] md:h-[580px]" />
          <div className="home-view-more-wrap relative z-20 mx-auto mt-[-36px] max-w-[1280px] text-center md:mt-[-64px]">
            {/* <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20" /> */}
            <button className="home-view-more relative rounded-full bg-[#BE4DFF] px-8 py-4 text-[16px] font-bold text-[#F1F2F4] md:px-10 md:py-[18px]">
              View More
            </button>
          </div>
        </div>
      </section>

      <section className="home-meet grid items-center gap-12 px-4 py-20 text-center md:grid-cols-2 md:px-20 md:py-32 md:text-left">
        <div className="home-meet__visual relative mx-auto h-[356px] w-[343px] md:h-[760px] md:w-[620px]">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-[28px] bg-gradient-to-b from-[#27113d] to-[#0E041A]" />
          <img src="/images/right_cluster_transparent.webp" alt="Luvo app preview" className="relative z-10 mx-auto h-full object-contain" />
        </div>
        <div className="home-meet__content mx-auto max-w-[560px]">
          <p className="text-[16px] font-bold text-white/70 md:text-[18px]">Meet New Friends</p>
          <h2 className="mt-4 text-[36px] font-bold leading-[1.22] md:text-[60px]">Start Meaningful Video Chats Anytime</h2>
        </div>
      </section>

      <section className="home-cta relative min-h-[754px] px-5 py-24 text-center md:min-h-[834px] md:py-56">
        <img src={heroImage} alt="" className="home-cta__image absolute inset-0 h-full w-full object-cover" />
        <div className="home-cta__overlay absolute inset-0 bg-[#0E041A]/55" />
        <div className="home-cta__fade absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-[#0e041a00] to-[#0E041A]" />
        <div className="home-cta__content relative z-10 mx-auto max-w-[1030px]">
          <p className="mb-5 text-[16px] font-bold text-white/70 md:text-[18px]">Download Luvo Today</p>
          <h2 className="text-[36px] font-bold leading-[1.22] md:text-[88px] md:leading-[1.2]">Chat With the World</h2>
          <div className="home-store-buttons mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <StoreButton type="google" />
            <StoreButton type="apple" />
          </div>
        </div>
        <footer className="home-footer absolute inset-x-4 bottom-12 z-10 flex flex-col items-center justify-between gap-4 text-[13px] text-white/70 md:inset-x-20 md:bottom-8 md:flex-row">
          <div className="flex items-center gap-2 text-white">
            <img src="/images/logo.png" alt="Kugo" className="h-[30px] w-[30px] rounded-md" />
            <span className="text-[24px] font-bold">Luvo</span>
          </div>
          <p>Room 811, Beverly Commercial Building, 87-105 Chatham Road south, Tsim Sha Tsui, Kowloon, Hong Kong</p>
          <p>Copyright © 2025 Kika Pika Network Limited</p>
        </footer>
      </section>
    </div>
  );
};

export default Home;
