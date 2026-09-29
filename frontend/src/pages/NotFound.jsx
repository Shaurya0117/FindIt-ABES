import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <AlertTriangle size={64} className="not-found-icon" />
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>
        <Home size={18} /> Go Home
      </Link>
    </div>
  );
}
