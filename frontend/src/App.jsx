import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, PlusCircle, Package } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import ItemDetails from './pages/ItemDetails';
import Dashboard from './pages/Dashboard';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Package className="text-primary-color" />
        FindIt@ABES
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Explore</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>
      <div>
        <Link to="/report" className="btn btn-primary">
          <PlusCircle size={20} /> Report Item
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
