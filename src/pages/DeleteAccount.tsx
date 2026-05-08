import React, { useEffect, useState } from 'react';
import { Apple, ArrowRight, Check, ChevronDown, Menu } from 'lucide-react';
import '../styles/delete-account.scss';

type AccountType = 'Molo ID' | 'Email address' | 'Google account' | 'Facebook account' | 'Apple account';

interface DeleteFormData {
  country: string;
  name: string;
  mobile: string;
  email: string;
  accountType: AccountType;
  accountId: string;
  reasons: string[];
}

const accountTypes: AccountType[] = ['Molo ID', 'Email address', 'Google account', 'Facebook account', 'Apple account'];

const reasonText =
  'I believe that it is no longer necessary for Tigo to hold the personal data it holds about me. (Please provide us with details as to your reasoning below.)';

const reasons = [reasonText, reasonText, reasonText, reasonText];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="delete-logo">
      <img src="/images/logo.png" alt="Luvo" className={small ? 'delete-logo__mark delete-logo__mark--small' : 'delete-logo__mark'} />
      <span className={small ? 'delete-logo__text delete-logo__text--small' : 'delete-logo__text'}>Luvo</span>
    </div>
  );
}

function StoreButton({ type }: { type: 'google' | 'apple' }) {
  const isGoogle = type === 'google';

  return (
    <a
      href={isGoogle ? 'https://play.google.com/store/apps/details?id=com.laachat.kugo' : '#'}
      target={isGoogle ? '_blank' : undefined}
      rel={isGoogle ? 'noopener noreferrer' : undefined}
      className="delete-store-button"
    >
      {isGoogle ? (
        <img src="/images/delete-account/google-play.svg" alt="" />
      ) : (
        <Apple className="delete-store-button__apple" />
      )}
      <span>{isGoogle ? 'Google Play' : 'AppStore'}</span>
    </a>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="delete-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="delete-input" />;
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="delete-select-wrap">
      <select {...props} className="delete-input delete-input--select" />
      <ChevronDown className="delete-select-wrap__icon" />
    </div>
  );
}

const DeleteAccount: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<DeleteFormData>({
    country: 'Angola',
    name: '',
    mobile: '',
    email: '',
    accountType: 'Molo ID',
    accountId: '',
    reasons: [...reasons],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleReason = (reason: string) => {
    setFormData((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reason)
        ? prev.reasons.filter((item) => item !== reason)
        : [...prev.reasons, reason],
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Request submitted successfully. We will contact you shortly.');
  };

  return (
    <div className="delete-page">
      <section className="delete-hero">
        <img className="delete-hero__image" src="/images/delete-account/hero.jpg" alt="" />
        <div className="delete-hero__overlay" />
        <div className="delete-hero__fade" />

        <nav className="delete-nav">
          <Logo small />
          <button className="delete-nav__back" type="button" onClick={() => window.history.back()} aria-label="Go back">
            <ArrowRight />
          </button>
          <button
            className="delete-nav__menu"
            type="button"
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="delete-mobile-menu">
            <div className="delete-mobile-menu__header">
              <Logo />
              <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                ×
              </button>
            </div>
            <div className="delete-mobile-menu__links">
              <a href="/home" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="/privacy-policy" onClick={() => setIsMobileMenuOpen(false)}>Privacy</a>
              <a href="/terms" onClick={() => setIsMobileMenuOpen(false)}>User Agreeme</a>
              <a href="/child-protection" onClick={() => setIsMobileMenuOpen(false)}>Children Safety</a>
              <a href="/banned-account" onClick={() => setIsMobileMenuOpen(false)}>Banned Account</a>
            </div>
            <a
              className="delete-mobile-menu__download"
              href="https://play.google.com/store/apps/details?id=com.laachat.kugo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download
            </a>
          </div>
        )}

        <div className="delete-hero__content">
          <h1>
            <span>Milo Data Subject </span>
            <span className="delete-gradient-text">Rights Request Form</span>
          </h1>
          <div className="delete-hero__desc">
            <p>
              For an overview of data subject rights available to you please refer to the{' '}
              <a href="/privacy-policy">Milo Privacy Policy</a>
              . If you feel that one of the rights applies to you and you wish to exercise it please complete the form and submit it to us together with the verification documentation set out at Part 3 below.
            </p>
            <p>
              Please ensure that you have provided all of the information requested below in a legible format, and add as much detail as possible as we will not respond to incomplete requests. If you have any questions about this form, please do not hesitate to contact us at info@Milo.com.
            </p>
            <p>Milo when used in this form refers to your data controlling entity referred to in the Milo Privacy Policy.</p>
          </div>
        </div>
      </section>

      <main className="delete-form-card">
        <form onSubmit={handleSubmit}>
          <div className="delete-form-card__header">
            <h2>Enter your contact information</h2>
            <p>Please carefully enter your data. We will not be able to service your request unless the data is entered correctly.</p>
          </div>

          <div className="delete-form-card__fields">
            <Field label="Country/Region">
              <SelectInput value={formData.country} onChange={(event) => setFormData({ ...formData, country: event.target.value })}>
                <option value="Angola">Angola</option>
                <option value="United States">United States</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Brazil">Brazil</option>
                <option value="Vietnam">Vietnam</option>
              </SelectInput>
            </Field>

            <Field label="Name">
              <TextInput value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
            </Field>

            <Field label="Mobile number you are currently using">
              <TextInput value={formData.mobile} onChange={(event) => setFormData({ ...formData, mobile: event.target.value })} />
            </Field>

            <Field label="Email to correspond with you">
              <TextInput type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
            </Field>

            <Field label="Select one of the following for identifying your Tigo account.">
              <SelectInput value={formData.accountType} onChange={(event) => setFormData({ ...formData, accountType: event.target.value as AccountType })}>
                {accountTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </SelectInput>
              <TextInput value={formData.accountId} onChange={(event) => setFormData({ ...formData, accountId: event.target.value })} />
            </Field>
          </div>

          <section className="delete-rights">
            <h3>Please choose which right you are exercising</h3>
            <div className="delete-checkbox-row delete-checkbox-row--erasure">
              <span className="delete-check">
                <Check />
              </span>
              <span>Erasure</span>
            </div>
            <div className="delete-rights__helper">
              <p>Please carefully enter your data. We will not be able to service your request unless the data is entered correctly.</p>
              <p>Enter your contact information</p>
            </div>

            <div className="delete-reasons">
              {reasons.map((reason, index) => {
                const checked = formData.reasons.includes(reason);
                return (
                  <label className="delete-checkbox-row delete-checkbox-row--reason" key={`${index}-${reason}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleReason(reason)} />
                    <span className="delete-check">
                      <Check />
                    </span>
                    <span>{reason}</span>
                  </label>
                );
              })}
            </div>
          </section>

          <button className="delete-submit" type="submit">
            Submit
          </button>
        </form>
      </main>

      <section className="delete-cta">
        <img src="/images/delete-account/footer-bg.jpg" alt="" className="delete-cta__image" />
        <div className="delete-cta__shade" />
        <div className="delete-cta__content">
          <p>Install now</p>
          <h2>
            <span className="delete-cta__desktop">Don&apos;t Miss Out</span>
            <span className="delete-cta__desktop">on The Fun</span>
            <span className="delete-cta__mobile">Chat Don&apos;t Miss Out on The Fun</span>
          </h2>
          <div className="delete-cta__buttons">
            <StoreButton type="google" />
            <StoreButton type="apple" />
          </div>
        </div>
        <footer className="delete-footer">
          <Logo />
          <p>Room 811, Beverly Commercial Building, 87-105 Chatham Road south,Tsim Sha Tsui, Kowloon, Hong Kong</p>
          <p>Copyright © 2025 Kika Pika Network Limited</p>
        </footer>
      </section>
    </div>
  );
};

export default DeleteAccount;
