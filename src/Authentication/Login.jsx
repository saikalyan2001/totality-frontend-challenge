import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext'; // Import custom hook for auth context
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/properties'); // Redirect to PropertyList or another route
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/properties'); // Redirect to PropertyList after successful login
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleFirebaseError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message.toLowerCase();

    switch (errorCode) {
      case 'auth/invalid-email':
        setError('Invalid email format. Please enter a valid email address.');
        break;
      case 'auth/user-disabled':
        setError('This user account has been disabled.');
        break;
      case 'auth/user-not-found':
        setError('No user found with this email.');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password. Please try again.');
        break;
      case 'auth/invalid-credential':
        if (errorMessage.includes('password is invalid')) {
          setError('Incorrect password. Please try again.');
        } else if (errorMessage.includes('no user record')) {
          setError('No user found with this email.');
        } else {
          setError('Invalid credentials. Please check your email and password.');
        }
        break;
      default:
        setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className='login-container'>
          <h2>Please Login</h2>

      <form onSubmit={handleLogin}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button className='login-btn' type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
