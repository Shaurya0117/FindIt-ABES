import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Plus, Package, BookOpen, User } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import ItemDetails from './pages/ItemDetails';
import Dashboard from './pages/Dashboard';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-main">
          <Package color="#2dd4bf" size={24} />
          FindIt@ABES
        </div>
        <div className="logo-sub">Campus Recovery Network</div>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={
av-link }>
          <Search size={16} /> Browse
        </Link>
        <Link to="/report" className={
av-link }>
          <Plus size={16} /> Report an item
        </Link>
        <Link to="/dashboard" className={
av-link }>
          <BookOpen size={16} /> My dashboard
        </Link>
      </div>

      <div>
        <Link to="/report" className="btn btn-primary">
          <Plus size={18} /> Report item
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
