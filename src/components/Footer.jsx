import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; 2024 Totality Rentals. All rights reserved.</p>
            <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
        </footer>
    );
}

export default Footer;
