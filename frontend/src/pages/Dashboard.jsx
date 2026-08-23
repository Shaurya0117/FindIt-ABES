import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, MapPin, CheckCircle, User, ArrowRight, Check, Trash2, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

  // Calculate mock global/user stats
  const allReports = userData.items.length + 2; 
  const lostCount = userData.items.filter(i => i.status === 'LOST').length;
  const foundCount = userData.items.filter(i => i.status === 'FOUND').length;
  const resolvedCount = 0;
  const myReportsCount = userData.items.length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'block' }}>
            YOUR CORNER OF THE BOARD
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#f8fafc' }}>My dashboard</h1>
          <p style={{ color: '#94a3b8' }}>Keep tabs on reports you have shared and help close the loop.</p>
        </div>
        <div>
          <Link to="/report" className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #2dd4bf, #fef08a)' }}>
            + New report
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-container">
        
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#2dd4bf' }}>
            <Package size={20} />
          </div>
          <div className="stat-number">{allReports}</div>
          <div className="stat-label">All reports</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#eab308' }}>
            <Search size={20} />
          </div>
          <div className="stat-number">{lostCount}</div>
          <div className="stat-label">Lost</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#3b82f6' }}>
            <MapPin size={20} />
          </div>
          <div className="stat-number">{foundCount}</div>
          <div className="stat-label">Found</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#a855f7' }}>
            <CheckCircle size={20} />
          </div>
          <div className="stat-number">{resolvedCount}</div>
          <div className="stat-label">Resolved</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#f43f5e' }}>
            <User size={20} />
          </div>
          <div className="stat-number">{myReportsCount}</div>
          <div className="stat-label">My reports</div>
        </div>

      </div>

      {/* Activity List Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
            MANAGE YOUR REPORTS
          </span>
          <h2 style={{ fontSize: '1.75rem', color: '#f1f5f9' }}>Your activity</h2>
        </div>
        <div style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
          {myReportsCount} SHOWN
        </div>
      </div>

      {/* Activity List */}
      <div>
        {userData.items.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>You haven't reported any items yet.</p>
        ) : (
          <div>
            {userData.items.map(item => (
              <div key={item.id} className="list-row-card">
                
                {/* Image */}
                <div className="list-row-image-wrap">
                  {item.imageUrl && item.imageUrl !== 'https://via.placeholder.com/300' ? (
                    <img src={item.imageUrl} alt={item.title} className="list-row-image" />
                  ) : (
                    <div className="card-empty-icon">
                      <BookOpen size={32} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="list-row-content">
                  <div className="list-row-header">
                    <span className={`card-badge ${item.status === 'LOST' ? 'badge-lost' : 'badge-found'}`}>
                      {item.status}
                    </span>
                    <span className="card-time">
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).replace('about ', '')}
                    </span>
                  </div>
                  
                  <h3 className="list-row-title">{item.title}</h3>
                  
                  <div className="list-row-location">
                    <MapPin size={14} /> 
                    {item.location}
                  </div>
                </div>

                {/* Actions */}
                <div className="list-row-actions">
                  <Link to={`/item/${item.id}`} title="View Details">
                    <button className="icon-btn">
                      <ArrowRight size={18} />
                    </button>
                  </Link>
                  <button className="icon-btn success" title="Mark Resolved (Coming Soon)">
                    <Check size={18} />
                  </button>
                  <button className="icon-btn danger" title="Delete Report (Coming Soon)">
                    <Trash2 size={18} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
