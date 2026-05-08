import React, { useEffect, useRef, useState } from 'react';
import '../styles/privacy.scss';
import { Toast } from '@/components/ui/toast';

const tabs = [
  { id: 'policy', label: 'Child Safety Policy' },
  { id: 'announcement', label: 'Announcement' },
  { id: 'detect', label: 'Detect Service' },
  { id: 'report', label: 'Report CSAM' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const getScrollTop = () => Math.max(
  window.scrollY,
  window.pageYOffset,
  document.documentElement.scrollTop,
  document.body.scrollTop,
  0
);

const setScrollTop = (top: number) => {
  document.body.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
  window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
};

const childSafetyScrollPositions: Record<TabId, number> = {
  policy: 0,
  announcement: 0,
  detect: 0,
  report: 0,
};

const childSafetyVisitedTabs: Record<TabId, boolean> = {
  policy: true,
  announcement: false,
  detect: false,
  report: false,
};

let childSafetyCachedActiveTab: TabId = 'policy';

const PolicyContent = () => (
  <div className="child-safety-rich-text">
    <h1>Milo Child Safety Policy</h1>
    <p className="policy-meta"><span>Last updated date: 2024-01-11</span><span>Contact us: info@Milo.chat</span></p>

    <h2>Policies</h2>
    <h3>Age Limitations</h3>
    <p>Users must be 18 years of age or above to utilize Milo.</p>
    <p>Any attempts to falsely represent age to access the platform are strictly prohibited and will lead to account banned.</p>
    <p className="text-strong">Milo deploys automated and human systems to recognize activities involving underage individuals as well as Child Sexual Exploitation and Abuse (&quot;CSAM&quot;). Any efforts to evade these detection features are prohibited. Prohibited conduct includes, but not limited to:</p>
    <p className="text-strong">Sexualization of Minors and CSAM (Child Sexual Abuse and Exploitation)</p>
    <p>Fabrication, dissemination, or sharing of content involving child sexual abuse or exploitation.</p>
    <p>Prohibition of content involving the sexual objectification of minors, comprising discussions, sexualized make-believe, or dressing in sexually suggestive attire.</p>
    <p>Any form of portrayal of child nudity or sexualization, including artistic renderings such as sketches or animations.</p>

    <h2>Hazardous or Harmful Acts towards Minors</h2>
    <p>Threats, endorsements, or acts of physical harm against minors.</p>
    <p>Psychological abuse, coercion, or manipulation of minors.</p>
    <p>Encouragement or demonstration of dangerous activities involving minors.</p>
    <p>Advocate or portrayal of neglect or trafficking of minors.</p>

    <h2>Underage Appearance on the Platform</h2>
    <p>The appearance of underage individuals in videos, or any other content is strictly forbidden.</p>
    <p>Accounts creation or management on behalf of underage individuals.</p>
    <p>False age representation to gain access to the platform.</p>

    <h2>Reporting Mechanism</h2>
    <p>Incidents of child abuse will be reported to the <a href="https://www.missingkids.org/home" target="_blank" rel="noopener noreferrer">National Center for Missing and Exploited Children (NCMEC)</a> or other apposite authorities as mandated by law.</p>
    <p>Users can report potential violations through the in-app reporting feature or by contacting us at report@Milo.chat.</p>

    <h2>Barred Users</h2>
    <p>Users proven guilty of crimes against children, comprising, but not limited to, sexual assault, physical harm, neglect, or trafficking are strictly prohibited from utilizing Milo.</p>

    <h2>Enforcement and Transparency</h2>
    <h3>Implementation Measures</h3>
    <p>All infringements of the Child Safety Policy will lead to an immediate account sanction.</p>
    <p>Depending on the severity of the violation, Milo may liaise with law enforcement agencies for further investigations.</p>

    <h2>User Education</h2>
    <p className="text-strong">We inform users about child safety through:</p>
    <p>Displaying the Child Safety Policy on our platform.</p>
    <p>Offering prompts and reminders during content creation and sharing.</p>

    <h2>Additional Help</h2>
    <p className="text-strong">In case you discover child exploitation or abuse outside Milo, we recommend reaching out to the respective resources based on your location:</p>
    <p>North America, Australia, New Zealand: <a href="https://www.missingkids.org" target="_blank" rel="noopener noreferrer">National Center for Missing &amp; Exploited Children (NCMEC)</a></p>
    <p>Europe: Law Enforcement Reporting Channels for Child Sexual Coercion and Extortion.</p>
    <p>South America and Other Regions: <a href="https://www.icmec.org/" target="_blank" rel="noopener noreferrer">International Centre for Missing &amp; Exploited Children</a> international hotline.</p>

    <h2>Commitment to Ensuring Child Safety</h2>
    <p>Milo will continually assesses and improves its procedures, systems, and practices to maintain the superior standards of child safety. We strive to render our platform a safe and welcoming space for all.</p>
  </div>
);

const AnnouncementContent = ({ onOpenDetect }: { onOpenDetect: () => void }) => (
  <div className="child-safety-rich-text child-safety-announcement">
    <h1>Announcement on the handling of underage content</h1>
    <p className="policy-meta"><span>Last updated date: 2024-01-11</span><span>Contact us: info@Milo.chat</span></p>

    <p className="text-strong">Dear Milo Users, we wish to notify that as part of our commitment to protect our underage users, Milo has initiated a targeted rectification. We've recognized that certain content or actions in our community can have negative impacts on the mental health and psychophysical development of minors. We take this issue very seriously and express deep concern.</p>
    <p className="text-strong">At present, we have taken the following measures regarding the underage-related content within the Milo APP：</p>
    <p className="text-strong">1.Regarding the content of images, we've scrutinized all user photos through a combination of machine detection and human verification. Any content involving minors has been removed diligently, and accounts that have maliciously uploaded information on minors have been banned. Our review standards are as follows:</p>

    <figure className="announcement-figure">
      <figcaption>1.Images where the main subject is a minor:</figcaption>
      <img src="/images/child-safety/announcement/minor-main.png" alt="Example where the main subject is a minor" />
    </figure>
    <figure className="announcement-figure">
      <figcaption>2.Images not primarily about minors, but where minors are present:</figcaption>
      <img src="/images/child-safety/announcement/minor-present.png" alt="Example where minors are present" />
    </figure>
    <figure className="announcement-figure">
      <figcaption>3.Images containing keywords such as 'Child', 'CP', etc:</figcaption>
      <img src="/images/child-safety/announcement/keywords.png" alt="Example containing child related keywords" />
    </figure>
    <figure className="announcement-figure">
      <figcaption>4.Suspected AI generated images of minors:</figcaption>
      <img src="/images/child-safety/announcement/ai-minor.png" alt="Example of suspected AI generated image of a minor" />
      <blockquote>The above sample images are AI-generated.</blockquote>
    </figure>

    <h2 className="announcement-detect-heading">
      You can also experience the <button type="button" onClick={onOpenDetect}>content detection service</button> online on our website.
    </h2>

    <p className="text-strong">2.Regarding text content, we've performed machine detection to delete text content containing information on minors, including text messages, user nicknames, and user Tags. Accounts that frequently propagate minor-related content in their interactions with others have also been banned. Our review standards are as follows:</p>
    <p>1.Users' text messages that frequently contain keywords such as 'Child', 'CP', etc.</p>
    <p>2.User nicknames containing keywords such as 'Child', 'CP', etc.</p>
    <p>3.Users' Tags containing keywords such as 'Child', 'CP', etc.</p>
    <p className="text-strong">After the aforementioned steps, we have removed 2,924 images related to minors and banned 982 relevant accounts, effectively purifying the Milo APP of underage content.You can click to view the penalty notice .</p>
    <p className="text-strong">In the future, we will adopt stricter methods to conduct thorough investigations on content involving minors, genuinely ensuring the cyber protection of underage individuals.</p>

    <p>1.Strict Content Review Standards: We will continue to supervise and rectify issues in the content on a real-time basis. Besides Milo’s AI detection, we have also integrated more content detection services, such as Aliyun, Yidun, and Amazon Rekognition. Through multiple layers of filtration, any content containing images and text information of minors will be screened out and automatically deleted by the machine. In addition, our team of human inspectors undergoes a review of the content left after machine detection. This way, even if some violative content may have bypassed the machine detection, it will not make its way into the app.</p>
    <p>2.Strict Real Person Verification: We provide a Real Person Verification functionality within our product, serving not just to ensure the authenticity of our users but also to verify their age. Users who pass this verification process are awarded a "Shield" icon. During the real person verification process, we ask users to upload a clear facial photo, followed by real-time facial detection. In this process, we upload the photo to the server of a third-party authority for age verification. We take the minimum detection result from different platforms as the age of the user, and any account of a user who is under 18 of will be banned.</p>
    <p>3.Strict handling of reports involving minors: Upon resuming updates of Milo, we plan to enhance the "minor" option in the report types within the APP. Additionally, we will introduce alert mechanisms of reports involving minors in our manual review team. This is to ensure that reports involving underage users are dealt with promptly. Accounts found in violation will face permanent banning without possibility of reinstatement.</p>
    <p>4.Stricter manual patrolling: We now require members of the Milo team to regularly patrol the content of the APP, serving as a kind of final check on the results of machine detection and manual review. Through this approach, we seek to ensure that there will be no more content that violates the rules within Milo.</p>
    <p>5.In addition, we have provided an entrance on our official website for users to report child sexual abuse. Milo users can click on <a href="#" onClick={(event) => { event.preventDefault(); }}>Report CSAM</a> in the <a href="/home">About Us</a> page of our official website to enter the official website of the National Center for Missing and Exploited Children to make a report.</p>
    <p className="text-strong">In conclusion, we wish to reiterate our unwavering commitment to enhancing our review mechanisms, and to safeguarding the rights and interests of minors on our platform. We understand and respect the immense responsibility that comes along with this commitment, and we pledge to leave no stone unturned in fulfilling these duties. We thank you for your understanding and cooperation as we continue to work towards fostering a safer and more inclusive space for all individuals.</p>
  </div>
);

const ReportContent = () => (
  <div className="child-safety-rich-text child-safety-report">
    <h1>Report CSAM</h1>
    <p className="policy-meta"><span>Last updated date: 2024-01-11</span><span>Contact us: info@Milo.chat</span></p>

    <div className="report-body">
      <p className="text-strong">The Milo team always prioritizes user safety, particularly the safety of our minors. If you find any content within our application that features elements of child sexual abuse, aside from reporting to the Milo, you also have the choice of reporting to the following institutions:</p>
      <p>1. The <a href="https://www.missingkids.org/home" target="_blank" rel="noopener noreferrer">National Center for Missing and Exploited Children</a> : They can report the content to the appropriate authorities around the world.</p>
      <p>2. Or you can report the content to your <a href="https://www.missingkids.org/gethelpnow/cybertipline" target="_blank" rel="noopener noreferrer">relevant regional authority</a>.</p>
    </div>
  </div>
);

const ChildSafety: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(childSafetyCachedActiveTab);
  const [uploadedImage, setUploadedImage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    policy: null,
    announcement: null,
    detect: null,
    report: null,
  });
  const scrollPositions = useRef<Record<TabId, number>>(childSafetyScrollPositions);
  const visitedTabs = useRef<Record<TabId, boolean>>(childSafetyVisitedTabs);
  const isInitialTabMount = useRef(true);
  const isRestoringTab = useRef(false);

  const scrollTabIntoView = (tab: TabId, behavior: ScrollBehavior = 'smooth') => {
    const container = tabsContainerRef.current;
    const tabElement = tabRefs.current[tab];
    if (!container || !tabElement) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tabElement.getBoundingClientRect();
    const left = container.scrollLeft + tabRect.left - containerRect.left - (containerRect.width - tabRect.width) / 2;
    container.scrollTo({ left, behavior });
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        if (!isRestoringTab.current) {
          scrollPositions.current[activeTab] = getScrollTop();
        }
        ticking = false;
      });

      ticking = true;
    };

    document.body.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      document.body.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  useEffect(() => {
    childSafetyCachedActiveTab = activeTab;
    window.setTimeout(() => scrollTabIntoView(activeTab, 'smooth'), 0);

    if (isInitialTabMount.current) {
      isInitialTabMount.current = false;
      return;
    }

    isRestoringTab.current = true;
    const timer = window.setTimeout(() => {
      const top = visitedTabs.current[activeTab] ? scrollPositions.current[activeTab] || 0 : 0;

      setScrollTop(top);
      scrollPositions.current[activeTab] = top;
      visitedTabs.current[activeTab] = true;

      window.setTimeout(() => {
        isRestoringTab.current = false;
      }, 120);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setUploadedImage(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const clearUpload = () => {
    setUploadedImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) return;

    scrollPositions.current[activeTab] = getScrollTop();
    childSafetyCachedActiveTab = tab;
    setActiveTab(tab);
    window.setTimeout(() => scrollTabIntoView(tab, 'smooth'), 0);
  };

  const storeButton = (type: 'google' | 'apple') => {
    const isGoogle = type === 'google';
    return (
      <a
        href={isGoogle ? 'https://play.google.com/store/apps/details?id=com.laachat.kugo' : '#'}
        target={isGoogle ? '_blank' : undefined}
        rel={isGoogle ? 'noopener noreferrer' : undefined}
        className="inline-flex h-12 min-w-[165px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[16px] font-bold text-[#303030] transition-transform hover:-translate-y-0.5 md:h-16 md:min-w-[167px] md:px-[30px] md:text-[18px]"
      >
        <img
          src={isGoogle ? '/images/child-safety/google-play.svg' : '/images/child-safety/app-store.svg'}
          onError={(event) => {
            event.currentTarget.src = isGoogle ? '/images/privacy/google-play.svg' : '/images/privacy/app-store.svg';
          }}
          alt=""
          className="h-5 w-5 md:h-[22px] md:w-[22px]"
        />
        {isGoogle ? 'Google Play' : 'AppStore'}
      </a>
    );
  };

  const renderActiveContent = () => {
    if (activeTab === 'policy') return <PolicyContent />;
    if (activeTab === 'announcement') return <AnnouncementContent onOpenDetect={() => handleTabChange('detect')} />;
    if (activeTab === 'report') return <ReportContent />;

    return (
      <div className="child-safety-detect">
        <h1>UGC Detection</h1>
        <p className="detect-intro">Upload a picture to detect the age and rating(Normal/Sexual/Pornographic).</p>

        <div className="child-safety-upload-card">
          <div className="detect-card-title-row">
            <div className="upload-title">Upload Photo</div>
            <button className="upload-clear" onClick={clearUpload} aria-label="Clear uploaded image">×</button>
          </div>

          <div className="detect-upload-content">
            {uploadedImage ? (
              <div className="upload-preview"><img src={uploadedImage} alt="Uploaded preview" /></div>
            ) : (
              <label className="upload-dropzone">
                <img className="upload-icon" src="/images/child-safety/upload.png" alt="" />
                <span className="upload-main">Click upload photo</span>
                <span className="upload-sub">JPG/JPEG/PNG only, max size:5MB</span>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} />
              </label>
            )}
            <button className="detect-button" onClick={() => setShowToast(true)}>Start Detect</button>
          </div>
        </div>

        <div className="detect-note">
          <p>Before uploading images, please be aware that your photos will not be stored on our servers but will be uploaded to third-party detection servers.</p>
          <p>Clicking “Start detect” indicates your agreement with our <a href="/terms">Terms of Servics</a> and <a href="/privacy-policy">Privacy Policy</a>.</p>
        </div>

        <div className="child-safety-result-card">
          <h2>Detect Result</h2>
          <div className="detect-fields">
            <label>
              <span>Age</span>
              <div className="detect-field-value">{uploadedImage ? <span>6</span> : ''}</div>
            </label>
            <label>
              <span>Rating<em>(Normal/Sexual/Pornographic)</em></span>
              <div className="detect-field-value rating-value">
                {uploadedImage ? <span className="rating-normal">Normal</span> : ''}
                {uploadedImage ? <span className="check-mark">✓</span> : null}
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="privacy-policy-container child-safety-page overflow-hidden bg-[#0E041A] text-white">
      <div className="child-safety-page-bg" />
      <section className="child-safety-hero">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/child-safety/hero-mobile.png" />
          <img src="/images/child-safety/hero.png" alt="" className="child-safety-hero__image" />
        </picture>
        <div className="child-safety-hero__shade" />
        <div className="child-safety-hero__fade" />
        <div className="child-safety-hero__content">
          <h1>Children Safety</h1>
          <p>Milo enforces a stringent policy of no tolerance towards any incidents of abuse, exploitation, or sexualization concerning children. Users failing to respect Milo’s policies to safeguard minors (individuals below the age of 18) in line with the provisions outlined below may face banned from Milo and potential legal consequences.</p>
        </div>
      </section>

      <main className="child-safety-main">
        <div ref={tabsContainerRef} className="child-safety-tabs" role="tablist" aria-label="Children Safety sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[tab.id] = element;
              }}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`child-safety-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <section className="child-safety-content-panel">{renderActiveContent()}</section>
      </main>

      <section className="privacy-cta child-safety-cta">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/child-safety/footer-bg-mobile.png" />
          <img src="/images/child-safety/footer-bg.png" alt="" className="privacy-cta__image" />
        </picture>
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

      {showToast ? (
        <div className="toast-container">
          <Toast id="child-safety-detect" title="Submit Successfully" type="success" onClose={() => setShowToast(false)} />
        </div>
      ) : null}
    </div>
  );
};

export default ChildSafety;
