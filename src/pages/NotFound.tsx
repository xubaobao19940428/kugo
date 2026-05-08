import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      textAlign: 'center',
      padding: '1rem'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(5rem, 15vw, 8rem)', 
        fontWeight: '900', 
        margin: '0', 
        background: 'linear-gradient(to bottom, #9333EA, #A855F7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        404
      </h1>
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1.5rem', fontWeight: '700' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#a1a1aa', marginBottom: '3rem', maxWidth: '500px', lineHeight: '1.6', fontSize: '1.1rem' }}>
        Oops! The page you're searching for seems to have vanished into the digital void.
      </p>
      <Link 
        to="/home"
        style={{
          padding: '1rem 2.5rem',
          backgroundColor: '#9333EA',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '0.75rem',
          fontWeight: '700',
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 20px -5px rgba(147, 51, 234, 0.4)'
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
