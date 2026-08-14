import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

function ReportItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    status: 'LOST',
    location: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let finalImageUrl = 'https://via.placeholder.com/300';
      if (imageFile) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        if (cloudName && uploadPreset) {
          const uploadData = new FormData();
          uploadData.append('file', imageFile);
          uploadData.append('upload_preset', uploadPreset);
          const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: uploadData
          });
          const uploadJson = await uploadRes.json();
          if (uploadJson.secure_url) finalImageUrl = uploadJson.secure_url;
        } else {
           console.warn('Cloudinary not configured, using placeholder');
        }
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageUrl: finalImageUrl })
      });
      
      if (response.ok) {
        toast.success('Item reported successfully!');
        navigate('/');
      } else {
        toast.error('Failed to report item');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error connecting to server');
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
            <label className="form-label">Photo (Required for claims)</label>
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
              {imagePreview ? (
                <div style={{ marginBottom: '1rem' }}>
                  <img src={imagePreview} alt="Preview" style={{ maxHeight: '200px', borderRadius: '0.5rem', margin: '0 auto', objectFit: 'contain' }} />
                  <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setImageFile(null); setImagePreview(null); }}>Remove Photo</button>
                </div>
              ) : (
                <>
                  <Camera size={32} style={{ margin: '0 auto 0.5rem auto', color: '#94a3b8' }} />
                  <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Click to select a photo</p>
                  <input type="file" accept="image/*" onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                        setImagePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </>
              )}
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
