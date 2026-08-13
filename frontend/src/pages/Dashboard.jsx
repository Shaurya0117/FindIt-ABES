import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, MessageCircle } from 'lucide-react';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/users/dashboard`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }, []);

  if (!userData) return <div className="text-center mt-4">Loading dashboard...</div>;

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Welcome, {userData.name}</h1>
          <p style={{ color: '#cbd5e1' }}>{userData.email} | Team Vynex</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* My Reports */}
        <div className="glass-card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
            <Package className="text-primary-color" /> My Reports
          </div>
          
          {userData.items.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>You haven't reported any items yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userData.items.map(item => (
                <div key={item.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                    <strong>{item.title}</strong>
                    <span className={`badge ${item.status === 'LOST' ? 'badge-lost' : 'badge-found'}`}>{item.status}</span>
                  </div>
                  <Link to={`/item/${item.id}`} style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>View details</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Claims */}
        <div className="glass-card">
          <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
            <MessageCircle className="text-accent-color" /> My Claims
          </div>
          
          {userData.claims.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>You haven't made any claims yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userData.claims.map(claim => (
                <div key={claim.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                    <strong>{claim.item.title}</strong>
                    <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d', border: '1px solid rgba(245, 158, 11, 0.5)' }}>
                      {claim.status}
                    </span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', fontStyle: 'italic' }}>"{claim.message}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
