import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <Package size={22} color="#2dd4bf" />
            <span>FindIt@ABES</span>
          </div>
          <p>
            A smarter, safer way to reconnect people with their lost belongings
            across the ABES Engineering College campus.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/browse">Browse Items</Link>
          <Link to="/report">Report an Item</Link>
          <Link to="/dashboard">My Dashboard</Link>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:Shaurya.25b15310117@abes.ac.in">
            <Mail size={14} /> Team Vynex
          </a>
          <span className="footer-address">
            <MapPin size={14} /> ABES Engineering College, Ghaziabad
          </span>
        </div>

      </div>

      <div className="footer-bottom">
        <span>
          Made with <Heart size={14} color="#ef4444" style={{ verticalAlign: 'middle' }} /> by{' '}
          <strong>Team Vynex</strong> · WebSpark 2026
        </span>
        <span>© {new Date().getFullYear()} FindIt@ABES. All rights reserved.</span>
      </div>
    </footer>
  );
}
