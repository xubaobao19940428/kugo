import { useState, useRef } from 'react';

const tabs = [
  { id: 'policy', label: 'Child Safety Policy' },
  { id: 'announcement', label: 'Announcement' },
  { id: 'banned', label: 'Banned Account Notice' },
  { id: 'detect', label: 'Detect Service' },
  { id: 'report', label: 'Report CSAM' },
] as const;

type ChildSafetyTabId = (typeof tabs)[number]['id'];
let lastActiveTab: ChildSafetyTabId = 'policy';

const bannedAccounts = [
  { id: '601284739', name: '***********' },
  { id: '602847291', name: 'N*******9' },
  { id: '603519284', name: 'N****a' },
  { id: '604728163', name: 'k********e' },
  { id: '605193847', name: 'T*********' },
  { id: '606847291', name: 'T*********y' },
  { id: '607284619', name: 'b***a' },
  { id: '608461927', name: 'G***********p' },
  { id: '609382716', name: 'L*****' },
  { id: '610847293', name: 'M****' },
  { id: '611928374', name: 'A****' },
  { id: '612847391', name: 'C***' },
  { id: '613928471', name: 'M****a' },
  { id: '614837291', name: 'u***********5' },
  { id: '615928473', name: 'N******************h' },
  { id: '616847291', name: 'L*****' },
  { id: '617928374', name: 'e*********i' },
  { id: '618473829', name: 'Z***i' },
  { id: '619284731', name: 'u***********d' },
  { id: '620384719', name: 'l******5' },
];

const ChildSafety = () => {
  const [activeTab, setActiveTab] = useState<ChildSafetyTabId>(lastActiveTab);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectResult, setDetectResult] = useState<null | { safe: boolean; confidence: number }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectTab = (tabId: ChildSafetyTabId) => {
    lastActiveTab = tabId;
    setActiveTab(tabId);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setDetectResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = () => {
    if (!uploadedImage) return;
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      setDetectResult({ safe: true, confidence: 98.5 });
    }, 2000);
  };

  const clearUpload = () => {
    setUploadedImage(null);
    setDetectResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="px-6 py-4 flex justify-end items-center border-b border-[#27272a] bg-[#0a0a0a]/80 backdrop-blur-md lg:sticky lg:top-0 lg:z-50">
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-lg text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a] transition-all"
        >
          ← Go Back
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#a1a1aa] bg-clip-text text-transparent">
            Children Safety
          </h1>
          <p className="text-[#71717a]">Updated as of: January, 2025</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-2 p-4 bg-[#111] rounded-2xl border border-[#27272a]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#9333EA] text-white'
                      : 'text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          <main className="flex-1 min-w-0">
            <div className="bg-[#111] rounded-2xl border border-[#27272a] p-6 md:p-8">
              {activeTab === 'policy' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Kugo Child Safety Policy</h2>
                    <p className="text-[#71717a] text-sm mb-6">Updated as of: January, 2025</p>
                    <p className="text-[#a1a1aa] leading-relaxed">
                      Kugo enforces a stringent policy of no tolerance towards any incidents of abuse, exploitation, or sexualization concerning children. Users failing to respect Kugo's policies to safeguard minors (individuals below the age of 18) in line with the provisions outlined below may face banned from Kugo and potential legal consequences.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#9333EA] mb-4">Policies</h3>
                    
                    <h4 className="text-lg font-semibold mb-3">Age Limitations</h4>
                    <ul className="space-y-2 text-[#a1a1aa] mb-6">
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>Users must be 18 years of age or above to utilize Kugo.</li>
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>Any attempts to falsely represent age to access the platform are strictly prohibited and will lead to account banned.</li>
                    </ul>

                    <h4 className="text-lg font-semibold mb-3">Prohibited Conduct</h4>
                    <p className="text-[#a1a1aa] mb-3">Kugo deploys automated and human systems to recognize activities involving underage individuals as well as Child Sexual Exploitation and Abuse ("CSAM"). Prohibited conduct includes:</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <h5 className="font-semibold text-white mb-2">Sexualization of Minors and CSAM</h5>
                        <ul className="space-y-2 text-[#a1a1aa] text-sm">
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Fabrication, dissemination, or sharing of content involving child sexual abuse or exploitation</li>
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Content involving the sexual objectification of minors</li>
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Any form of portrayal of child nudity or sexualization, including artistic renderings</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <h5 className="font-semibold text-white mb-2">Hazardous or Harmful Acts</h5>
                        <ul className="space-y-2 text-[#a1a1aa] text-sm">
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Threats, endorsements, or acts of physical harm against minors</li>
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Psychological abuse, coercion, or manipulation of minors</li>
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Encouragement of dangerous activities involving minors</li>
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Advocate or portrayal of neglect or trafficking of minors</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <h5 className="font-semibold text-white mb-2">Underage Appearance on Platform</h5>
                        <ul className="space-y-2 text-[#a1a1aa] text-sm">
                          <li className="flex gap-2"><span className="text-red-400">✕</span>The appearance of underage individuals in videos or any other content</li>
                          <li className="flex gap-2"><span className="text-red-400">✕</span>Account creation or management on behalf of underage individuals</li>
                          <li className="flex gap-2"><span className="text-red-400">✕</span>False age representation to gain access to the platform</li>
                        </ul>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold mb-3">Reporting Mechanism</h4>
                    <ul className="space-y-2 text-[#a1a1aa] mb-6">
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>Incidents of child abuse will be reported to the <a href="https://www.missingkids.org/home" target="_blank" rel="noopener noreferrer" className="text-[#9333EA] hover:underline">National Center for Missing and Exploited Children (NCMEC)</a> or other appropriate authorities as mandated by law.</li>
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>Users can report potential violations through the in-app reporting feature or by contacting us at <a href="mailto:solli.devid@gmail.com" className="text-[#9333EA] hover:underline">solli.devid@gmail.com</a>.</li>
                    </ul>

                    <h4 className="text-lg font-semibold mb-3">Barred Users</h4>
                    <p className="text-[#a1a1aa] mb-6">Users proven guilty of crimes against children, comprising but not limited to sexual assault, physical harm, neglect, or trafficking are strictly prohibited from utilizing Kugo.</p>

                    <h4 className="text-lg font-semibold mb-3">Enforcement and Transparency</h4>
                    <ul className="space-y-2 text-[#a1a1aa] mb-6">
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>All infringements of the Child Safety Policy will lead to immediate account sanction.</li>
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>Depending on the severity, Kugo may liaise with law enforcement agencies for further investigations.</li>
                    </ul>

                    <h4 className="text-lg font-semibold mb-3">User Education</h4>
                    <ul className="space-y-2 text-[#a1a1aa] mb-6">
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>Displaying the Child Safety Policy on our platform</li>
                      <li className="flex gap-3"><span className="text-[#9333EA]">•</span>Offering prompts and reminders during content creation and sharing</li>
                    </ul>

                    <h4 className="text-lg font-semibold mb-3">Additional Help</h4>
                    <div className="p-4 bg-[#1a1a1a] rounded-xl space-y-3 text-[#a1a1aa] text-sm">
                      <p><strong className="text-white">North America, Australia, New Zealand:</strong> <a href="https://www.missingkids.org/home" target="_blank" rel="noopener noreferrer" className="text-[#9333EA] hover:underline">National Center for Missing & Exploited Children (NCMEC)</a></p>
                      <p><strong className="text-white">Europe:</strong> Law Enforcement Reporting Channels for Child Sexual Coercion and Extortion</p>
                      <p><strong className="text-white">South America and Other Regions:</strong> <a href="https://www.icmec.org/" target="_blank" rel="noopener noreferrer" className="text-[#9333EA] hover:underline">International Centre for Missing & Exploited Children</a></p>
                    </div>

                    <div className="mt-8 p-5 bg-[#9333EA]/10 border border-[#9333EA]/30 rounded-xl">
                      <h4 className="font-semibold text-[#9333EA] mb-2">Our Commitment</h4>
                      <p className="text-[#a1a1aa] text-sm">Kugo will continually assess and improve its procedures, systems, and practices to maintain the superior standards of child safety. We strive to render our platform a safe and welcoming space for all.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'announcement' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Announcement on the Handling of Underage Content</h2>
                  
                  <div className="space-y-4 text-[#a1a1aa] leading-relaxed">
                    <p>Dear Kugo Users, we wish to notify that as part of our commitment to protect our underage users, Kugo has initiated a targeted rectification. We've recognized that certain content or actions in our community can have negative impacts on the mental health and psychophysical development of minors. We take this issue very seriously and express deep concern.</p>
                    
                    <p className="font-semibold text-white">At present, we have taken the following measures regarding the underage-related content within the Kugo APP:</p>

                    <div className="p-5 bg-[#1a1a1a] rounded-xl space-y-4">
                      <h4 className="font-semibold text-white">1. Image Content Review</h4>
                      <p className="text-sm">We've scrutinized all user photos through a combination of machine detection and human verification. Any content involving minors has been removed diligently, and accounts that have maliciously uploaded information on minors have been banned.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-[#0a0a0a] rounded-lg">
                          <span className="text-red-400">1.</span> Images where the main subject is a minor
                        </div>
                        <div className="p-3 bg-[#0a0a0a] rounded-lg">
                          <span className="text-red-400">2.</span> Images with minors present but not main subject
                        </div>
                        <div className="p-3 bg-[#0a0a0a] rounded-lg">
                          <span className="text-red-400">3.</span> Images containing keywords such as 'Child', 'CP', etc.
                        </div>
                        <div className="p-3 bg-[#0a0a0a] rounded-lg">
                          <span className="text-red-400">4.</span> Suspected AI generated images of minors
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-[#1a1a1a] rounded-xl space-y-3">
                      <h4 className="font-semibold text-white">2. Text Content Review</h4>
                      <p className="text-sm">We've performed machine detection to delete text content containing information on minors, including text messages, user nicknames, and user Tags. Accounts that frequently propagate minor-related content have been banned.</p>
                    </div>

                    <div className="p-5 bg-[#9333EA]/10 border border-[#9333EA]/30 rounded-xl">
                      <h4 className="font-semibold text-[#9333EA] mb-3">Enforcement Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-white">3,847+</p>
                          <p className="text-sm text-[#a1a1aa]">Images Removed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-white">1,256+</p>
                          <p className="text-sm text-[#a1a1aa]">Accounts Banned</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-semibold text-white pt-4">Future Measures:</h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <p className="font-medium text-white mb-1">1. Strict Content Review Standards</p>
                        <p className="text-sm">We have integrated multiple content detection services including AI detection and multi-layer filtration. Our team of human inspectors undergoes a review of the content left after machine detection.</p>
                      </div>
                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <p className="font-medium text-white mb-1">2. Strict Real Person Verification</p>
                        <p className="text-sm">Users who pass verification are awarded a "Shield" icon. During verification, we upload the photo for age verification. Any account of a user who is under 18 will be banned.</p>
                      </div>
                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <p className="font-medium text-white mb-1">3. Enhanced Minor Report Handling</p>
                        <p className="text-sm">We've enhanced the "minor" option in report types and introduced alert mechanisms. Reports involving underage users are dealt with promptly with permanent banning.</p>
                      </div>
                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <p className="font-medium text-white mb-1">4. Stricter Manual Patrolling</p>
                        <p className="text-sm">Team members regularly patrol the content of the APP, serving as a final check on the results of machine detection and manual review.</p>
                      </div>
                      <div className="p-4 bg-[#1a1a1a] rounded-xl">
                        <p className="font-medium text-white mb-1">5. CSAM Reporting Portal</p>
                        <p className="text-sm">We have provided an entrance on our official website for users to <button onClick={() => selectTab('report')} className="text-[#9333EA] hover:underline">Report CSAM</button> directly to NCMEC.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'banned' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Banned Account Notice</h2>
                  
                  <div className="space-y-4 text-[#a1a1aa]">
                    <p>Starting from June 2025, we have initiated a thorough review of the user-generated content (UGC) on Kugo APP, specifically targeting the malicious posting of images involving minors, as well as instances infringing upon the privacy of minors.</p>
                    
                    <div className="p-4 bg-[#9333EA]/10 border border-[#9333EA]/30 rounded-xl">
                      <p className="text-sm">Through this targeted action, we have eliminated <strong className="text-white">3,847 images</strong> violating our regulations, and have banned <strong className="text-white">1,256 accounts</strong> for maliciously uploading images of minors.</p>
                    </div>

                    <p>Kugo APP is unwavering in its commitment to strictly combat and eliminate content that violates rules, particularly actions that can harm or infringe upon the rights and privacy of minors. We strive to create a healthy and safe social environment for our users.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Sample of Banned User Accounts:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#27272a]">
                            <th className="text-left py-3 px-4 font-semibold text-[#a1a1aa]">User ID</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#a1a1aa]">Username</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bannedAccounts.map((account, idx) => (
                            <tr key={idx} className="border-b border-[#27272a]/50 hover:bg-[#1a1a1a] transition-colors">
                              <td className="py-3 px-4 text-[#71717a] font-mono">{account.id}</td>
                              <td className="py-3 px-4 text-[#a1a1aa]">{account.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-[#52525b] mt-4 text-center">Showing 20 of 1,256 banned accounts. Usernames are partially masked for privacy.</p>
                  </div>
                </div>
              )}

              {activeTab === 'detect' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Content Detection Service</h2>
                  
                  <p className="text-[#a1a1aa]">We use advanced AI technology to detect and prevent harmful content on our platform.</p>
                  
                  <div className="p-5 bg-[#1a1a1a] rounded-xl">
                    <h3 className="font-semibold mb-3">How It Works</h3>
                    <p className="text-[#a1a1aa] text-sm">Our system automatically scans uploaded content to identify potentially harmful material. Suspicious content is flagged for human review. This demo allows you to test our detection service.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#0a0a0a] rounded-2xl border border-[#27272a]">
                      <h4 className="font-semibold mb-4">Upload Image</h4>
                      {!uploadedImage ? (
                        <div 
                          className="border-2 border-dashed border-[#27272a] rounded-xl p-8 text-center cursor-pointer hover:border-[#9333EA]/50 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#52525b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-[#a1a1aa] text-sm mb-2">Click to upload or drag and drop</p>
                          <p className="text-[#52525b] text-xs">PNG, JPG up to 10MB</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover rounded-xl" />
                          <button
                            onClick={clearUpload}
                            className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black transition-colors"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      <button
                        onClick={handleDetect}
                        disabled={!uploadedImage || isDetecting}
                        className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all ${
                          uploadedImage && !isDetecting
                            ? 'bg-[#9333EA] hover:bg-[#A855F7] text-white'
                            : 'bg-[#27272a] text-[#52525b] cursor-not-allowed'
                        }`}
                      >
                        {isDetecting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Detecting...
                          </span>
                        ) : 'Detect Content'}
                      </button>
                    </div>

                    <div className="p-6 bg-[#0a0a0a] rounded-2xl border border-[#27272a]">
                      <h4 className="font-semibold mb-4">Detection Result</h4>
                      {!detectResult ? (
                        <div className="h-48 flex items-center justify-center text-[#52525b]">
                          <p>Upload an image and click detect to see results</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-xl ${detectResult.safe ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                            <div className="flex items-center gap-3">
                              {detectResult.safe ? (
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              )}
                              <div>
                                <p className={`font-semibold ${detectResult.safe ? 'text-green-400' : 'text-red-400'}`}>
                                  {detectResult.safe ? 'Content is Safe' : 'Violation Detected'}
                                </p>
                                <p className="text-sm text-[#a1a1aa]">Confidence: {detectResult.confidence}%</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-3 bg-[#1a1a1a] rounded-lg">
                              <span className="text-[#a1a1aa]">Minor Content</span>
                              <span className="text-green-400">Not Detected</span>
                            </div>
                            <div className="flex justify-between p-3 bg-[#1a1a1a] rounded-lg">
                              <span className="text-[#a1a1aa]">NSFW Content</span>
                              <span className="text-green-400">Not Detected</span>
                            </div>
                            <div className="flex justify-between p-3 bg-[#1a1a1a] rounded-lg">
                              <span className="text-[#a1a1aa]">Violence</span>
                              <span className="text-green-400">Not Detected</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#52525b] text-center">This is a demonstration of our content detection capabilities. Actual detection uses multiple AI models for comprehensive analysis.</p>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Report CSAM</h2>
                  
                  <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-300 font-medium">If you have encountered Child Sexual Abuse Material (CSAM), please report it immediately.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">How to Report</h3>
                    <p className="text-[#a1a1aa] mb-4">You can report through any of the following channels:</p>
                    
                    <div className="space-y-4">
                      <div className="p-5 bg-[#1a1a1a] rounded-xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#9333EA]/20 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-white mb-1">In-App Reporting</p>
                          <p className="text-[#a1a1aa] text-sm">Use the report button available on any profile, message, or content within the Kugo app.</p>
                        </div>
                      </div>

                      <div className="p-5 bg-[#1a1a1a] rounded-xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#9333EA]/20 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-white mb-1">Email Report</p>
                          <p className="text-[#a1a1aa] text-sm">Send detailed reports to <a href="mailto:solli.devid@gmail.com" className="text-[#9333EA] hover:underline">solli.devid@gmail.com</a></p>
                        </div>
                      </div>

                      <a 
                        href="https://www.missingkids.org/gethelpnow/cybertipline" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-5 bg-[#9333EA]/10 border border-[#9333EA]/30 rounded-xl hover:bg-[#9333EA]/20 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#9333EA]/30 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-[#9333EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-[#9333EA] mb-1">NCMEC CyberTipline →</p>
                            <p className="text-[#a1a1aa] text-sm">Report directly to the National Center for Missing & Exploited Children</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="p-5 bg-[#1a1a1a] rounded-xl">
                    <p className="text-[#a1a1aa] text-sm"><strong className="text-white">All reports are taken seriously and investigated thoroughly.</strong> We cooperate fully with law enforcement agencies worldwide and will take immediate action on confirmed violations.</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <footer className="mt-20 border-t border-[#27272a] bg-[#0a0a0a] px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-[#9333EA] to-[#A855F7] bg-clip-text text-transparent mb-6">
              Kugo
            </div>
            <p className="text-[#a1a1aa] text-base max-w-sm mb-8 leading-relaxed">
              Committed to creating a safe environment for all users. Zero tolerance for child exploitation.
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
              <p className="text-[#a1a1aa] font-medium">Safety Resources</p>
              <div className="flex flex-wrap md:justify-end gap-4 text-sm text-[#71717a]">
                <a href="https://www.missingkids.org/home" target="_blank" rel="noopener noreferrer" className="hover:text-[#9333EA] transition-colors">NCMEC</a>
                <a href="https://www.icmec.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#9333EA] transition-colors">ICMEC</a>
                <a href="https://www.iwf.org.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#9333EA] transition-colors">IWF</a>
              </div>
            </div>
            <p className="text-[#52525b] text-sm">© 2025 Kugo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChildSafety;
