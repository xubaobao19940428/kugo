import React, { useEffect, useState } from 'react';
import request from '../api/request';
import '../styles/privacy.scss';

interface SiteConfig {
  userAgreement: {
    content: string;
  };
}

const UserAgreement: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await request('/SiteCfg.json') as SiteConfig;
        if (data?.userAgreement?.content) {
          setContent(data.userAgreement.content);
        }
      } catch (error) {
        console.error('Failed to fetch user agreement:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="privacy-policy-container">
      <header className="privacy-policy-header">
        <h1>User Agreement: Your Guide to Using Kugo Responsibly</h1>
      </header>
      <main 
        className="privacy-policy-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default UserAgreement;
