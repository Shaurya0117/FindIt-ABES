import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, MapPin, CheckCircle, User, ArrowRight, Check, Trash2, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchDashboard = () => {
    fetch(`${API_URL}/api/users/dashboard`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleResolve = async (itemId) => {
    try {
      const res = await fetch(`${API_URL}/api/items/${itemId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RESOLVED' })
      });
      if (res.ok) {
        toast.success('Item marked as resolved!');
        fetchDashboard();
      } else {
        toast.error('Failed to update status');
      }
    } catch { toast.error('Server error'); }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this report? This cannot be undone.')) return;
    try {
      const res = await fetch(`${API_URL}/api/items/${itemId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Report deleted');
        fetchDashboard();
      } else {
        toast.error('Failed to delete');
      }
    } catch { toast.error('Server error'); }
  };

  if (!userData) return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
      <div className="loading-spinner" />
      <p style={{ color: '#64748b', marginTop: '1rem' }}>Loading dashboard...</p>
    </div>
  );

  const lostCount = userData.items.filter(i => i.status === 'LOST').length;
  const foundCount = userData.items.filter(i => i.status === 'FOUND').length;
  const resolvedCount = userData.items.filter(i => i.status === 'RESOLVED').length;
  const myReportsCount = userData.items.length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
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
          <div className="stat-icon-wrap" style={{ color: '#2dd4bf' }}><Package size={20} /></div>
          <div className="stat-number">{myReportsCount}</div>
          <div className="stat-label">All reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#eab308' }}><Search size={20} /></div>
          <div className="stat-number">{lostCount}</div>
          <div className="stat-label">Lost</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#3b82f6' }}><MapPin size={20} /></div>
          <div className="stat-number">{foundCount}</div>
          <div className="stat-label">Found</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ color: '#a855f7' }}><CheckCircle size={20} /></div>
          <div className="stat-number">{resolvedCount}</div>
          <div className="stat-label">Resolved</div>
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
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#141b26', borderRadius: '1.5rem', border: '1px dashed #1e293b' }}>
            <BookOpen size={48} color="#334155" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>No reports yet</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>You haven't reported any items yet.</p>
            <Link to="/report" className="btn btn-primary">Report your first item</Link>
          </div>
        ) : (
          <div>
            {userData.items.map(item => (
              <div key={item.id} className="list-row-card">
                <div className="list-row-image-wrap">
                  {item.imageUrl && item.imageUrl !== 'https://via.placeholder.com/300' ? (
                    <img src={item.imageUrl} alt={item.title} className="list-row-image" />
                  ) : (
                    <div className="card-empty-icon"><BookOpen size={32} /></div>
                  )}
                </div>
                <div className="list-row-content">
                  <div className="list-row-header">
                    <span className={`card-badge ${item.status === 'LOST' ? 'badge-lost' : item.status === 'FOUND' ? 'badge-found' : 'badge-found'}`}
                          style={item.status === 'RESOLVED' ? { background: 'rgba(16,185,129,0.1)', color: '#10b981', borderColor: 'rgba(16,185,129,0.2)' } : {}}>
                      {item.status}
                    </span>
                    <span className="card-time">
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).replace('about ', '')}
                    </span>
                  </div>
                  <h3 className="list-row-title">{item.title}</h3>
                  <div className="list-row-location"><MapPin size={14} /> {item.location}</div>
                </div>
                <div className="list-row-actions">
                  <Link to={`/item/${item.id}`} title="View Details">
                    <button className="icon-btn"><ArrowRight size={18} /></button>
                  </Link>
                  {item.status !== 'RESOLVED' && (
                    <button className="icon-btn success" title="Mark Resolved" onClick={() => handleResolve(item.id)}>
                      <Check size={18} />
                    </button>
                  )}
                  <button className="icon-btn danger" title="Delete Report" onClick={() => handleDelete(item.id)}>
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
