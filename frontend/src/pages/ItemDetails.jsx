import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [claimMessage, setClaimMessage] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(${API_URL}/api/items/)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleClaim = async (e) => {
    e.preventDefault();
    setIsClaiming(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(${API_URL}/api/claims, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id, message: claimMessage })
      });
      
      if (response.ok) {
        setHasClaimed(true);
        toast.success('Request submitted successfully!');
      } else {
        toast.error('Failed to submit claim');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error connecting to server');
    } finally {
      setIsClaiming(false);
    }
  };

  if (!item) return <div className="text-center mt-4">Loading details...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="glass-card flex gap-4" style={{ flexDirection: 'column' }}>
        {item.imageUrl && item.imageUrl !== 'https://via.placeholder.com/300' && (
          <div style={{ width: '100%', maxHeight: '400px', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1rem' }}>
            <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'rgba(0,0,0,0.2)' }} />
          </div>
        )}

        <div>
          <span className={adge }>
            {item.status}
          </span>
          <h1 style={{ marginTop: '1rem', fontSize: '2.5rem' }}>{item.title}</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Category: <strong style={{ color: 'white' }}>{item.category}</strong>
          </p>

          <div className="flex gap-4" style={{ flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div className="flex items-center gap-2" style={{ color: '#cbd5e1' }}>
              <MapPin className="text-primary-color" /> {item.location}
            </div>
            <div className="flex items-center gap-2" style={{ color: '#cbd5e1' }}>
              <Calendar className="text-primary-color" /> Posted {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </div>
            <div className="flex items-center gap-2" style={{ color: '#cbd5e1' }}>
              <User className="text-primary-color" /> Reported by {item.user?.name || 'Anonymous'}
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Description</h3>
          <p style={{ lineHeight: '1.8', color: '#e2e8f0', marginBottom: '2rem', whiteSpace: 'pre-line', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            {item.description}
          </p>
        </div>

        <div style={{ padding: '2rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          {hasClaimed ? (
            <div className="text-center">
              <CheckCircle size={48} className="text-success" style={{ margin: '0 auto 1rem auto' }} />
              <h3>Claim Request Submitted!</h3>
              <p style={{ color: '#cbd5e1', marginTop: '0.5rem' }}>The reporter will be notified of your request.</p>
            </div>
          ) : (
            <form onSubmit={handleClaim}>
              <h3 style={{ marginBottom: '1rem' }}>
                {item.status === 'LOST' ? 'I found this item!' : 'This is my item!'}
              </h3>
              <div className="form-group">
                <label className="form-label">Provide verification details</label>
                <textarea 
                  className="form-textarea" 
                  rows="3"
                  placeholder={item.status === 'LOST' ? "Where did you find it? How can the owner contact you?" : "What are some unique features that prove this is yours?"}
                  value={claimMessage}
                  onChange={(e) => setClaimMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isClaiming}>
                {isClaiming ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
