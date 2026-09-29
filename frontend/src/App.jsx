import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Plus, Package, BookOpen, Menu, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Landing from './pages/Landing';
import ReportItem from './pages/ReportItem';
import ItemDetails from './pages/ItemDetails';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={`navbar ${isLanding ? 'navbar-transparent' : ''}`}>
      <Link to="/" className="logo">
        <div className="logo-main">
          <Package color="#2dd4bf" size={24} />
          FindIt@ABES
        </div>
        <div className="logo-sub">Campus Recovery Network</div>
      </Link>

      {/* Desktop nav */}
      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/browse" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
          <Search size={16} /> Browse
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
          <Plus size={16} /> Report
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
          <BookOpen size={16} /> Dashboard
        </NavLink>
      </div>

      <div className="nav-right">
        <Link to="/report" className="btn btn-primary btn-nav-cta">
          <Plus size={18} /> Report item
        </Link>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/browse" element={<PageWrap><Home /></PageWrap>} />
        <Route path="/report" element={<PageWrap><ReportItem /></PageWrap>} />
        <Route path="/item/:id" element={<PageWrap><ItemDetails /></PageWrap>} />
        <Route path="/dashboard" element={<PageWrap><Dashboard /></PageWrap>} />
        <Route path="*" element={<PageWrap><NotFound /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} />
        <div className="container">
          <Navbar />
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
