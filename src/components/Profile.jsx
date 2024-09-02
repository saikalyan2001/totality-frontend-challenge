import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            setUserDetails(docSnapshot.data());
          } else {
            setError('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          setError('Error fetching user details. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchUserDetails();
  };

  const handleLoginAnotherAccount = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="card">
        <p>{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {user ? (
        <div className="card">
          <h2 className="profile-title">Your Profile</h2>

          {user.photoURL ? (
            <img
              className="user-avatar"
              src={user.photoURL}
              alt="User Avatar"
            />
          ) : (
            <span className="material-icons user-avatar-icon">account_circle</span>
          )}

          <h1>Welcome, {userDetails?.username || user.displayName || 'User'}!</h1>

          <button className="logout-btn" onClick={logout}>Logout</button>

          <button className="login-another-btn" onClick={handleLoginAnotherAccount}>
            Login with Another Account
          </button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default Profile;
