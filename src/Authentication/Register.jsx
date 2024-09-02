import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; 
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); 

    const mobilePattern = /^[0-9]{10}$/; 
    if (!mobilePattern.test(mobile)) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        mobile,
        address,
        email,
      });

      alert('User registered successfully');
    } catch (error) {

      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('The email address is already in use by another account.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please choose a stronger password.');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled. Please contact support.');
          break;
        default:
          setError('An error occurred during registration. Please try again.');
          break;
      }
    }
  };

  return (
    <div className='register-container'>
      <h2>Please Register</h2>
      
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          pattern="[0-9]{10}" 
          required
          title="Mobile number must be exactly 10 digits."
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>} {}
        <button className='register-btn' type="submit">Register</button>
      </form>
      <p className='register-p'>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
