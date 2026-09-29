import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  Package, Search, Camera, Shield, Bell, Smartphone, 
  CheckCircle, ArrowRight, MapPin, Users, Heart, 
  Mail, Zap, Eye, Lock, Sparkles
} from 'lucide-react';

/* ── tiny helpers ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  })
};

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.section>
  );
}

/* ── animated counter ─────────────────────────────── */
function Counter({ end, label, icon: Icon, color }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(end / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <motion.div ref={ref} className="stat-counter-card" variants={fadeUp}>
      <div className="stat-counter-icon" style={{ color }}>
        <Icon size={24} />
      </div>
      <span className="stat-counter-number">{count}+</span>
      <span className="stat-counter-label">{label}</span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ */
/*                   LANDING PAGE                    */
/* ══════════════════════════════════════════════════ */
export default function Landing() {
  const [stats, setStats] = useState({ totalItems: 24, resolvedItems: 12, totalUsers: 48 });

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/stats`)
      .then(r => r.json())
      .then(d => setStats({
        totalItems: Math.max(d.totalItems || 0, 24),
        resolvedItems: Math.max(d.resolvedItems || 0, 12),
        totalUsers: Math.max(d.totalUsers || 0, 48)
      }))
      .catch(() => {});
  }, []);

  return (
    <div className="landing-page">

      {/* ── HERO ────────────────────────────────── */}
      <section className="landing-hero">
        {/* floating blobs */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Built for ABES Engineering College</span>
          </div>

          <h1 className="hero-headline">
            Never Lose<br />
            <span className="hero-gradient-text">What Matters.</span>
          </h1>

          <p className="hero-sub">
            The smartest way to report, search, and recover lost items across campus.
            Built by students, powered by community trust.
          </p>

          <div className="hero-buttons">
            <Link to="/browse" className="btn btn-hero-primary">
              <Search size={18} /> Browse Lost Items
            </Link>
            <Link to="/report" className="btn btn-hero-secondary">
              <Camera size={18} /> Report Now <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hero-trust-row">
            <div className="hero-trust-avatars">
              <div className="trust-avatar" style={{ background: '#2dd4bf' }}>S</div>
              <div className="trust-avatar" style={{ background: '#eab308' }}>A</div>
              <div className="trust-avatar" style={{ background: '#3b82f6' }}>R</div>
              <div className="trust-avatar" style={{ background: '#a855f7' }}>M</div>
            </div>
            <span className="hero-trust-text">
              Trusted by <strong>ABES students</strong> across all departments
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────── */}
      <Section className="landing-section">
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-tag">HOW IT WORKS</span>
          <h2 className="section-title">Three steps to recovery</h2>
          <p className="section-sub">From lost to found in minutes, not weeks.</p>
        </motion.div>

        <div className="steps-grid">
          {[
            { icon: Camera, title: 'Report', desc: 'Snap a photo, pick a category, drop a pin. Done in 30 seconds.', color: '#2dd4bf', num: '01' },
            { icon: Search, title: 'Match', desc: 'Our system surfaces the most likely matches from existing reports.', color: '#eab308', num: '02' },
            { icon: CheckCircle, title: 'Reunite', desc: 'Verify ownership, connect safely, and get your stuff back.', color: '#3b82f6', num: '03' }
          ].map((s, i) => (
            <motion.div key={s.num} className="step-card" variants={fadeUp} custom={i}>
              <span className="step-num">{s.num}</span>
              <div className="step-icon" style={{ color: s.color, borderColor: s.color }}>
                <s.icon size={28} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── FEATURES ────────────────────────────── */}
      <Section className="landing-section">
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-tag">FEATURES</span>
          <h2 className="section-title">Everything you need</h2>
          <p className="section-sub">Purpose-built for campus lost-and-found.</p>
        </motion.div>

        <div className="features-grid">
          {[
            { icon: Camera, title: 'Photo Reporting', desc: 'Upload a picture and we auto-categorize. Visual proof for every listing.', color: '#2dd4bf' },
            { icon: Lock, title: 'Verified Claims', desc: 'Every claim goes through a verification step. No false ownership.', color: '#eab308' },
            { icon: Search, title: 'Smart Search', desc: 'Filter by category, status, location, and date. Find items in seconds.', color: '#3b82f6' },
            { icon: Smartphone, title: 'Mobile Friendly', desc: 'Fully responsive design. Report or browse right from your phone.', color: '#a855f7' },
            { icon: Bell, title: 'Instant Alerts', desc: 'Get notified the moment someone claims or matches your item.', color: '#f43f5e' },
            { icon: MapPin, title: 'Campus Focused', desc: 'Built specifically for ABES with campus locations and departments.', color: '#10b981' }
          ].map((f, i) => (
            <motion.div key={f.title} className="feature-card" variants={fadeUp} custom={i}>
              <div className="feature-icon" style={{ color: f.color, background: `${f.color}15`, borderColor: `${f.color}30` }}>
                <f.icon size={22} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── STATS ───────────────────────────────── */}
      <Section className="landing-section landing-stats-section">
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-tag">IMPACT</span>
          <h2 className="section-title">Real numbers, real reunions</h2>
        </motion.div>

        <div className="stats-counter-grid">
          <Counter end={stats.totalItems} label="Items Reported" icon={Package} color="#2dd4bf" />
          <Counter end={stats.resolvedItems} label="Successfully Returned" icon={CheckCircle} color="#10b981" />
          <Counter end={stats.totalUsers} label="Active Users" icon={Users} color="#eab308" />
        </div>
      </Section>

      {/* ── TEAM ────────────────────────────────── */}
      <Section className="landing-section">
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-tag">TEAM VYNEX</span>
          <h2 className="section-title">Built with intention, shipped with speed</h2>
          <p className="section-sub">WebSpark 2026 · ABES Engineering College</p>
        </motion.div>

        <div className="team-grid">
          {[
            { name: 'Shaurya Pratap Singh', role: 'Team Leader', email: 'Shaurya.25b15310117@abes.ac.in', initial: 'S', color: '#2dd4bf' },
            { name: 'Subhan', role: 'Developer', email: 'Subhan.25b15310060@abes.ac.in', initial: 'SB', color: '#eab308' },
            { name: 'Sumit', role: 'Developer', email: 'Sumit.25b15310155@abes.ac.in', initial: 'SM', color: '#3b82f6' }
          ].map((m, i) => (
            <motion.div key={m.name} className="team-card" variants={fadeUp} custom={i}>
              <div className="team-avatar" style={{ background: `${m.color}20`, color: m.color, borderColor: `${m.color}40` }}>
                {m.initial}
              </div>
              <h3>{m.name}</h3>
              <span className="team-role">{m.role}</span>
              <a href={`mailto:${m.email}`} className="team-email">
                <Mail size={14} /> {m.email.split('@')[0]}
              </a>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── FINAL CTA ──────────────────────────── */}
      <Section className="landing-section landing-cta-section">
        <motion.div className="cta-box" variants={fadeUp}>
          <div className="cta-blob cta-blob-1" />
          <div className="cta-blob cta-blob-2" />
          <Sparkles size={32} className="cta-sparkle" />
          <h2>Ready to give every lost item<br />a way back home?</h2>
          <p>Join the ABES community and start reporting today.</p>
          <div className="hero-buttons" style={{ justifyContent: 'center' }}>
            <Link to="/report" className="btn btn-hero-primary">
              <Zap size={18} /> Start Reporting
            </Link>
            <Link to="/browse" className="btn btn-hero-secondary">
              Browse Items <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </Section>

    </div>
  );
}
