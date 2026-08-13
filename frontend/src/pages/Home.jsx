import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Search } from 'lucide-react';

function Home() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <h1>FindIt@ABES</h1>
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>
          Igniting Ideas. Building Campus Solutions.
        </p>
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search for lost keys, ID cards, electronics..." 
            className="form-input"
            style={{ paddingLeft: '3rem', fontSize: '1.1rem', borderRadius: '2rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <h2 style={{ marginBottom: '1.5rem' }}>Recent Reports</h2>
      {filteredItems.length === 0 ? (
        <p className="text-center" style={{ color: '#94a3b8' }}>No items found.</p>
      ) : (
        <div className="items-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="glass-card">
              <span className={`badge ${item.status === 'LOST' ? 'badge-lost' : 'badge-found'}`}>
                {item.status}
              </span>
              <h3 style={{ margin: '1rem 0' }}>{item.title}</h3>
              <p style={{ color: '#cbd5e1', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.description}
              </p>
              
              <div className="flex items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} /> {item.location}
              </div>
              <div className="flex items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <Calendar size={16} /> {new Date(item.createdAt).toLocaleDateString()}
              </div>
              
              <Link to={`/item/${item.id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
