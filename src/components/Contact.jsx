import React, { useState } from 'react';
import './Contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1 className='contact-title'>Contact Us</h1>
      </header>
      <section className="contact-content">
        <h2 className='heading-2'>Get in Touch</h2>
        <p className='para'>
          We’d love to hear from you! Whether you have questions, feedback, or need assistance, please feel free to reach out to us using the form below.
        </p>
        {formSubmitted ? (
          <p className="thank-you-message">Thank you for your message. We will get back to you shortly!</p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        )}
      </section>
      <footer className="contact-footer">
        <p>&copy; 2024 Totality Rentals. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
