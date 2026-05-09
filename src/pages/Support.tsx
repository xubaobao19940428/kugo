import React from 'react';

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Kugo Support</h1>
        <p className="text-[#a1a1aa] mb-12">
          We're here to help. If you have any questions, issues, or feedback about the Kugo app, please reach out to us using the options below.
        </p>

        <div className="space-y-8">
          <div className="bg-[#111111] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-[#a1a1aa] mb-4">
              For any questions, concerns, or support requests, please email us at:
            </p>
            <a
              href="mailto:solli.devid@gmail.com"
              className="text-[#9333EA] hover:text-[#A855F7] text-lg font-medium transition-colors"
            >
              solli.devid@gmail.com
            </a>
            <p className="text-[#a1a1aa] text-sm mt-3">
              We typically respond within 24 hours.
            </p>
          </div>

          <div className="bg-[#111111] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">How do I create an account?</h3>
                <p className="text-[#a1a1aa] text-sm">
                  Download the Kugo app from the App Store or Google Play, then follow the on-screen instructions to sign up.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">How do I delete my account?</h3>
                <p className="text-[#a1a1aa] text-sm">
                  You can submit an account deletion request through our{' '}
                  <a href="/account-deletion" className="text-[#9333EA] hover:text-[#A855F7] underline transition-colors">
                    Account Deletion Form
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">How do I report a user?</h3>
                <p className="text-[#a1a1aa] text-sm">
                  You can report a user directly within the app by tapping the report button during or after a video call. You can also email us with details.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Is my data safe?</h3>
                <p className="text-[#a1a1aa] text-sm">
                  Yes. We take your privacy seriously. Please review our{' '}
                  <a href="/privacy-policy" className="text-[#9333EA] hover:text-[#A855F7] underline transition-colors">
                    Privacy Policy
                  </a>
                  {' '}for details on how we handle your data.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Policies</h2>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-[#9333EA] hover:text-[#A855F7] underline transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[#9333EA] hover:text-[#A855F7] underline transition-colors">
                  User Agreement
                </a>
              </li>
              <li>
                <a href="/child-protection" className="text-[#9333EA] hover:text-[#A855F7] underline transition-colors">
                  Child Safety Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
