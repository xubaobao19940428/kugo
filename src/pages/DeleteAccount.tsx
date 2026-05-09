import React, { useState } from 'react';

const DeleteAccount: React.FC = () => {
  const [formData, setFormData] = useState({
    country: '',
    name: '',
    mobile: '',
    email: '',
    accountType: 'Kugo ID',
    accountId: '',
    isErasure: true,
    reasons: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Request submitted successfully. We will contact you shortly.');
  };

  const handleReasonChange = (reason: string) => {
    setFormData(prev => ({
      ...prev,
      reasons: prev.reasons.includes(reason)
        ? prev.reasons.filter(r => r !== reason)
        : [...prev.reasons, reason]
    }));
  };

  const accountTypes = [
    'Kugo ID',
    'Email address',
    'Google account',
    'Facebook account',
    'Apple account'
  ];

  const erasureReasons = [
    "I believe that it is no longer necessary for Kugo to hold the personal data it holds about me.",
    "Kugo is processing my personal data on the basis of my consent, and I wish to withdraw my consent.",
    "Kugo is processing my personal data on the basis of Kugo's legitimate interest and I object to such processing.",
    "I believe the personal data Kugo holds about me is being unlawfully processed by Kugo."
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      <header className="px-6 py-4 flex justify-between items-center border-b border-[#27272a] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#9333EA] to-[#A855F7] bg-clip-text text-transparent">
          Kugo
        </div>
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-lg text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a] transition-all"
        >
          ← Go Back
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-white to-[#a1a1aa] bg-clip-text text-transparent">
            Kugo Data Subject Rights Request Form
          </h1>
          <div className="text-[#a1a1aa] text-lg space-y-4 leading-relaxed">
            <p>
              Please read the <a href="/privacy-policy" className="text-[#9333EA] hover:text-[#A855F7] underline underline-offset-4 transition-colors">Kugo Privacy Policy</a> carefully before completing this form.
            </p>
            <p>
              Please complete this form legibly. If you have any questions, please contact our Data Protection Officer at <a href="mailto:solli.devid@gmail.com" className="text-[#9333EA] hover:text-[#A855F7] transition-colors">solli.devid@gmail.com</a>.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <section className="space-y-8 bg-[#111] p-8 rounded-3xl border border-[#27272a]">
            <div className="flex items-center gap-4 border-b border-[#27272a] pb-6">
              <span className="w-10 h-10 rounded-xl bg-[#9333EA]/10 flex items-center justify-center text-[#9333EA] font-bold">01</span>
              <h3 className="text-xl font-bold text-white">Request Form</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-sm font-semibold text-[#a1a1aa] mb-3">Country / Region</label>
                <div className="relative">
                  <select 
                    className="w-full bg-[#0a0a0a] border border-[#27272a] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 focus:border-[#9333EA] transition-all appearance-none cursor-pointer text-white"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                    required
                  >
                    <option value="" disabled>Select your region</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="HK">Hong Kong</option>
                    <option value="CN">China</option>
                    <option value="IN">India</option>
                    <option value="BR">Brazil</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#52525b]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#a1a1aa] mb-3">Full Name</label>
                <input 
                  type="text"
                  className="w-full bg-[#0a0a0a] border border-[#27272a] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 focus:border-[#9333EA] transition-all placeholder-[#52525b]"
                  placeholder="Your full legal name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-[#a1a1aa] mb-3">Mobile number you are currently using</label>
                  <input 
                    type="tel"
                    className="w-full bg-[#0a0a0a] border border-[#27272a] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 focus:border-[#9333EA] transition-all placeholder-[#52525b]"
                    placeholder="+1 (555) 000-0000"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#a1a1aa] mb-3">Email to correspond with you</label>
                  <input 
                    type="email"
                    className="w-full bg-[#0a0a0a] border border-[#27272a] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 focus:border-[#9333EA] transition-all placeholder-[#52525b]"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-[#a1a1aa] mb-3">Account Type</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-[#0a0a0a] border border-[#27272a] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 focus:border-[#9333EA] transition-all appearance-none cursor-pointer text-white"
                      value={formData.accountType}
                      onChange={e => setFormData({...formData, accountType: e.target.value as any})}
                      required
                    >
                      {accountTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#52525b]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#a1a1aa] mb-3">
                    {formData.accountType === 'Kugo ID' ? 'Kugo ID' : 
                     formData.accountType === 'Email address' ? 'Email Address' : 
                     formData.accountType === 'Mobile number' ? 'Phone Number' : 
                     'Account ID / Handle'}
                  </label>
                  <input 
                    type="text"
                    className="w-full bg-[#0a0a0a] border border-[#27272a] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/50 focus:border-[#9333EA] transition-all placeholder-[#52525b]"
                    placeholder={`Enter your ${formData.accountType}`}
                    value={formData.accountId}
                    onChange={e => setFormData({...formData, accountId: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8 bg-[#111] p-8 rounded-3xl border border-[#27272a]">
            <div className="flex items-center gap-4 border-b border-[#27272a] pb-6">
              <span className="w-10 h-10 rounded-xl bg-[#9333EA]/10 flex items-center justify-center text-[#9333EA] font-bold">02</span>
              <h3 className="text-xl font-bold text-white">Rights to Exercise</h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-[#a1a1aa] text-sm uppercase tracking-wider font-semibold">Please choose which right you are exercising:</p>
              
              <label className="flex items-start gap-4 p-5 rounded-2xl border border-[#9333EA]/50 bg-[#9333EA]/5 cursor-pointer group transition-all">
                <div className="mt-1 relative flex items-center justify-center">
                  <input 
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 rounded border border-[#9333EA] bg-[#0a0a0a] checked:bg-[#9333EA] transition-all cursor-pointer"
                    checked={formData.isErasure}
                    onChange={e => setFormData({...formData, isErasure: e.target.checked})}
                  />
                  <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="space-y-1">
                  <span className="block font-bold text-white">Erasure</span>
                  <span className="block text-sm text-[#a1a1aa]">
                    Request permanent deletion of your personal data.
                  </span>
                </div>
              </label>
            </div>
          </section>

          <section className="space-y-8 bg-[#111] p-8 rounded-3xl border border-[#27272a]">
            <div className="flex items-center gap-4 border-b border-[#27272a] pb-6">
              <span className="w-10 h-10 rounded-xl bg-[#9333EA]/10 flex items-center justify-center text-[#9333EA] font-bold">03</span>
              <h3 className="text-xl font-bold text-white">Reason for Request</h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-[#a1a1aa] font-medium leading-relaxed">
                If you have other requests, please specify on what basis are you requesting erasure. <span className="text-[#52525b] text-sm">(Providing details helps us process your request more efficiently)</span>
              </p>
              
              <div className="space-y-4">
                {erasureReasons.map((reason, idx) => (
                  <label key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-[#27272a] hover:bg-[#1a1a1a] cursor-pointer transition-all group">
                    <div className="mt-1 relative flex items-center justify-center">
                      <input 
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 rounded border border-[#3f3f46] bg-[#0a0a0a] checked:bg-[#9333EA] checked:border-[#9333EA] transition-all cursor-pointer"
                        checked={formData.reasons.includes(reason)}
                        onChange={() => handleReasonChange(reason)}
                      />
                      <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm text-[#d4d4d8] group-hover:text-white transition-colors leading-relaxed select-none">{reason}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-8 bg-[#111] p-8 rounded-3xl border border-[#27272a]">
            <div className="flex items-center gap-4 border-b border-[#27272a] pb-6">
              <span className="w-10 h-10 rounded-xl bg-[#9333EA]/10 flex items-center justify-center text-[#9333EA] font-bold">04</span>
              <h3 className="text-xl font-bold text-white">Verification</h3>
            </div>
            
            <div className="p-5 rounded-2xl bg-[#9333EA]/5 border border-[#9333EA]/20 flex gap-4">
              <div className="text-[#9333EA] mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white">Identity Verification Required</h4>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  To prevent unauthorized requests and protect your data, we need to verify your identity. After submitting this form, we may contact you to request additional proof of identity (such as a government-issued ID or confirmation via your registered email/phone) before we can proceed with the erasure of your data.
                </p>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-[#9333EA] hover:bg-[#A855F7] text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-purple-900/20 active:scale-[0.98] text-lg flex items-center justify-center gap-3 group"
            >
              <span>Submit Erasure Request</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <p className="mt-6 text-center text-sm text-[#52525b]">
              By clicking Submit, you acknowledge that you are the account holder and understand that this action is permanent.
            </p>
          </div>
        </form>
      </main>

      <footer className="mt-20 border-t border-[#27272a] bg-[#0a0a0a] px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-[#9333EA] to-[#A855F7] bg-clip-text text-transparent mb-6">
              Kugo
            </div>
            <p className="text-[#a1a1aa] text-base max-w-sm mb-8 leading-relaxed">
              Connecting people through private video conversations. Authentic, safe, and global.
            </p>
            <address className="not-italic text-sm text-[#71717a] space-y-2 leading-loose">
              <p className="font-semibold text-[#a1a1aa]">LAA APPAREL LIMITED</p>
              <p>Rm 303 3/F ST GEORGE'S BLDG,</p>
              <p>2 ICE HSE ST, Central, Hong Kong</p>
              <p className="pt-2">Email: <a href="mailto:solli.devid@gmail.com" className="text-[#9333EA] hover:text-[#A855F7] transition-colors">solli.devid@gmail.com</a></p>
            </address>
          </div>
          <div className="md:text-right flex flex-col justify-end">
             <div className="space-y-4 mb-8">
               <p className="text-[#a1a1aa] font-medium">Platform Standards</p>
               <div className="flex flex-wrap md:justify-end gap-4 text-sm text-[#71717a]">
                 <span>GDPR Compliant</span>
                 <span>Secure Data</span>
                 <span>Privacy First</span>
               </div>
             </div>
             <p className="text-[#52525b] text-sm">© 2026 Kugo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeleteAccount;
