import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PropertyList from './components/PropertyList';
import CartPage from './components/Cart';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Profile from './components/Profile';
import { CartProvider } from './components/CartProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import FavoritesPage from './components/FavoritesPage';
import CheckoutPage from './components/CheckoutPage';
import BookingsPage from './components/BookingsPage';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <Layout>
              <PropertyList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <Layout>
              <About />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Layout>
              <CartPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <Layout>
              <BookingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Layout>
              <CheckoutPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Layout>
              <Contact />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Layout>
              <FavoritesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} /> {}
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
