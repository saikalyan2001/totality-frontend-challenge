import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; 

function Header() {
  const location = useLocation(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  
  const isActive = (path) => location.pathname === path;

 
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Totality Rentals</h1>
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          <span className="material-icons">menu</span>
        </button>
        <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="header-list">
            <li className="header-item">
              <Link to="/" className={`header-link ${isActive('/properties') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">home</span> Home
              </Link>
            </li>
            <li className="header-item">
              <Link to="/cart" className={`header-link ${isActive('/cart') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">shopping_cart</span> Cart
              </Link>
            </li>
            <li className="header-item">
              <Link to="/bookings" className={`header-link ${isActive('/bookings') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">event</span> Bookings
              </Link>
            </li>
            <li className="header-item">
              <Link to="/favorites" className={`header-link ${isActive('/favorites') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">favorite</span> Fav
              </Link>
            </li>
            <li className="header-item">
              <Link to="/profile" className={`header-link ${isActive('/profile') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">person</span> Profile
              </Link>
            </li>
            <li className="header-item">
              <Link to="/about" className={`header-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">info</span> About
              </Link>
            </li>
            <li className="header-item">
              <Link to="/contact" className={`header-link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">contact_mail</span> Contact
              </Link>
            </li>
            {/* <li className="header-item">
              <Link to="/login" className={`header-link ${isActive('/login') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">login</span> Login
              </Link>
            </li> */}
            <li className="header-item">
              <Link to="/register" className={`header-link ${isActive('/register') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="material-icons nav-icon">login</span> Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
