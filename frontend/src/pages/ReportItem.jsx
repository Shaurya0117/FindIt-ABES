import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Tag } from 'lucide-react';

function ReportItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    status: 'LOST',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        navigate('/');
      } else {
        alert('Failed to report item');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to server');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 className="text-center" style={{ marginBottom: '2rem' }}>Report an Item</h1>
      
      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Report Type</label>
            <div className="flex gap-4">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="status" 
                  value="LOST" 
                  checked={formData.status === 'LOST'}
                  onChange={handleChange}
                />
                I Lost Something
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="status" 
                  value="FOUND" 
                  checked={formData.status === 'FOUND'}
                  onChange={handleChange}
                />
                I Found Something
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Item Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-input" 
              placeholder="e.g. Blue Dell Laptop"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <div style={{ position: 'relative' }}>
              <Tag size={18} style={{ position: 'absolute', left: '1rem', top: '0.9rem', color: '#94a3b8' }} />
              <select 
                name="category" 
                className="form-select" 
                style={{ paddingLeft: '2.5rem' }}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="ID Cards">ID Cards</option>
                <option value="Books/Notebooks">Books/Notebooks</option>
                <option value="Wallets/Keys">Wallets/Keys</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location Details</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '0.9rem', color: '#94a3b8' }} />
              <input 
                type="text" 
                name="location" 
                className="form-input" 
                placeholder="e.g. Cafe, Bhabha Block Room 102"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Identifying Features</label>
            <textarea 
              name="description" 
              className="form-textarea" 
              rows="4" 
              placeholder="Provide specific details that only the owner would know..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Photo (Optional Demo)</label>
            <div className="flex items-center justify-center" style={{ border: '2px dashed var(--border-color)', borderRadius: '0.5rem', padding: '2rem', color: '#94a3b8' }}>
              <div className="text-center">
                <Camera size={32} style={{ margin: '0 auto 0.5rem auto' }} />
                <p>Click to upload or drag and drop</p>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportItem;
