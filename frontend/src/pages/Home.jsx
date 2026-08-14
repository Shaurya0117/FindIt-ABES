import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, PackageOpen, Filter } from 'lucide-react';
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
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div>
      <div className="text-center" style={{ padding: '4rem 0 2rem 0' }}>
        <h1>FindIt@ABES</h1>
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>
          Igniting Ideas. Building Campus Solutions.
        </p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '1.2rem', top: '1.1rem', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search for lost laptops, ID cards, wallets..." 
            className="form-input"
            style={{ paddingLeft: '3.5rem', fontSize: '1.1rem', borderRadius: '2rem', padding: '1rem 3.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-pills">
          <button className={`filter-pill ${filterStatus === 'ALL' ? 'active' : ''}`} onClick={() => setFilterStatus('ALL')}>All Items</button>
          <button className={`filter-pill ${filterStatus === 'LOST' ? 'active' : ''}`} onClick={() => setFilterStatus('LOST')}>Lost Only</button>
          <button className={`filter-pill ${filterStatus === 'FOUND' ? 'active' : ''}`} onClick={() => setFilterStatus('FOUND')}>Found Only</button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
          <Filter size={18} />
          <select 
            className="form-select" 
            style={{ width: 'auto', padding: '0.5rem 1rem', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.05)' }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="ID Cards">ID Cards</option>
            <option value="Books/Notebooks">Books/Notebooks</option>
            <option value="Wallets/Keys">Wallets/Keys</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <h2 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Recent Reports
        <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 'normal' }}>
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </span>
      </h2>
      
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <PackageOpen size={48} className="empty-state-icon" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>No items found</h3>
          <p style={{ color: '#94a3b8' }}>Try adjusting your filters or search term to find what you're looking for.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
              
              <div className="card-image-container">
                <img src={item.imageUrl || 'https://via.placeholder.com/300'} alt={item.title} className="card-image" />
                <span className={`badge ${item.status === 'LOST' ? 'badge-lost' : 'badge-found'}`} style={{ position: 'absolute', top: '1rem', right: '1rem', backdropFilter: 'blur(4px)' }}>
                  {item.status}
                </span>
              </div>

              <div style={{ flexGrow: 1, padding: '0 0.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {item.category} • Posted {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </p>
                <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                  {item.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center" style={{ marginTop: 'auto', paddingTop: '1rem', paddingLeft: '0.5rem', paddingRight: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  <MapPin size={16} /> <span style={{ maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.location}</span>
                </div>
                <Link to={`/item/${item.id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
