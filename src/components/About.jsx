import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Totality Rentals</h1>
      </header>
      <section className="about-content">
        <h2>Welcome to Totality Rentals!</h2>
        <p>
          At Totality Rentals, we strive to provide the best property rental experience for our clients. Our platform connects renters with property owners, offering a wide range of rental options to suit every need and budget.
        </p>
        <h3>Our Mission</h3>
        <p>
          Our mission is to make the property rental process as seamless and stress-free as possible. We aim to provide a user-friendly platform where you can easily find, compare, and book your next rental property.
        </p>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Wide selection of properties</li>
          <li>Easy booking management</li>
          <li>24/7 customer support</li>
          <li>Transparent pricing</li>
        </ul>
        <h3>Contact Us</h3>
        <p>
          If you have any questions or need assistance, feel free to reach out to our support team. We are here to help!
        </p>
        <p>Email: support@totalityrentals.com</p>
        <p>Phone: 123-456-7890</p>
      </section>
      <footer className="about-footer">
        <p>&copy; 2024 Totality Rentals. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
