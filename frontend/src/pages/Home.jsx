import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Filter, BookOpen, Clock, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function Home() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, LOST, FOUND
  const [filterCategory, setFilterCategory] = useState('ALL');

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        
        {/* Left: Hero Text */}
        <div style={{ flex: 1, paddingRight: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2dd4bf', boxShadow: '0 0 10px #2dd4bf' }}></div>
            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em' }}>
              ABES CAMPUS / LIVE BOARD
            </span>
          </div>

          <h1 className="hero-title">
            Lost something?<br/>
            <span className="gradient-text">Start here.</span>
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6 }}>
            A calmer way to reconnect people with what matters. Search recent reports from the ABES community, then claim with confidence.
          </p>
        </div>

        {/* Right: Promise Card */}
        <div style={{ flexBasis: '400px' }}>
          <div className="promise-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              <span>COMMUNITY PROMISE</span>
              <Heart size={16} color="#fcd34d" />
            </div>
            <h3 style={{ color: '#f1f5f9', fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              No awkward messages. Just the right details, shared safely.
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <ShieldCheck size={18} color="#2dd4bf" />
              Your contact details stay private
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Row */}
      <div className="search-container">
        <Search size={20} color="#64748b" style={{ marginRight: '0.5rem' }} />
        <input 
          type="text" 
          placeholder="Search by item, place, or detail" 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid #1e293b', paddingLeft: '1rem' }}>
          <Filter size={18} color="#64748b" />
          <select 
            className="category-dropdown"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="ALL">All categories</option>
            <option value="Electronics">Electronics</option>
            <option value="ID Cards">ID Cards</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filters-row">
        <div className="filter-pills">
          <button className={`filter-pill ${filterStatus === 'ALL' ? 'active' : ''}`} onClick={() => setFilterStatus('ALL')}>Everything</button>
          <button className={`filter-pill ${filterStatus === 'LOST' ? 'active' : ''}`} onClick={() => setFilterStatus('LOST')}>Lost Items</button>
          <button className={`filter-pill ${filterStatus === 'FOUND' ? 'active' : ''}`} onClick={() => setFilterStatus('FOUND')}>Found Items</button>
        </div>
        <div style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={14} /> Newest first
        </div>
      </div>

      {/* Noticeboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
            The Noticeboard
          </span>
          <h2 style={{ fontSize: '1.75rem', color: '#f1f5f9' }}>Recent reports</h2>
        </div>
        <div style={{ color: '#64748b', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
          {filteredItems.length < 10 ? `0${filteredItems.length}` : filteredItems.length} REPORTS
        </div>
      </div>
      
      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#141b26', borderRadius: '1.5rem', border: '1px dashed #1e293b' }}>
          <BookOpen size={48} color="#334155" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem', fontSize: '1.5rem' }}>No items found</h3>
          <p style={{ color: '#64748b' }}>We couldn't find any items matching your search criteria.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map(item => (
            <Link to={`/item/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
              <div className="item-card">
                
                {/* Top Image Half */}
                <div className="card-image-wrap">
                  {item.imageUrl && item.imageUrl !== 'https://via.placeholder.com/300' ? (
                    <img src={item.imageUrl} alt={item.title} className="card-image" />
                  ) : (
                    <div className="card-empty-icon">
                      <BookOpen size={40} />
                    </div>
                  )}
                  {/* Category Badge overlay on image bottom left */}
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(4px)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', color: '#94a3b8' }}>
                    {item.category}
                  </div>
                </div>

                {/* Bottom Content Half */}
                <div className="card-content">
                  <div className="card-header">
                    <span className={`card-badge ${item.status === 'LOST' ? 'badge-lost' : 'badge-found'}`}>
                      {item.status}
                    </span>
                    <span className="card-time">
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).replace('about ', '')}
                    </span>
                  </div>

                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                  
                  <div className="card-footer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} color="#eab308" /> 
                      <span style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.location}
                      </span>
                    </div>
                    <ArrowRight size={16} />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
