import React, { useEffect, useState } from 'react';
import request from '../api/request';
import '../styles/privacy.scss';

interface SiteConfig {
  privacy: {
    content: string;
  };
}

const PrivacyPolicy: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await request('/SiteCfg.json') as SiteConfig;
        if (data?.privacy?.content) {
          setContent(data.privacy.content);
        }
      } catch (error) {
        console.error('Failed to fetch privacy policy:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="privacy-policy-container">
      <header className="privacy-policy-header">
        <h1>Your Privacy Matters: Understanding How We Protect Your Data</h1>
      </header>
      <main 
        className="privacy-policy-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PrivacyPolicy;
