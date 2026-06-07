import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'الرئيسية' },
    { to: '/who-am-i', label: 'من أنا' },
    { to: '/courses', label: 'الكورسات' },
    { to: '/payment', label: 'الاشتراك' },
    { to: '/contact', label: 'تواصل معي' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-en">FN</span>
          <span className="logo-divider" />
          <span className="logo-ar">أكاديمية</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="nav-auth">
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to="/dashboard" className="nav-link nav-dashboard">لوحة التحكم</Link>
                )}
                <button className="btn-nav-logout" onClick={handleLogout}>خروج</button>
              </>
            ) : (
              <Link to="/auth" className="btn-nav-login">تسجيل الدخول</Link>
            )}
          </div>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>
    </nav>
  );
}
