import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to E-Shop</h1>
        <p>Your one-stop shop for amazing products</p>

        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>

          {!user && (
            <Link to="/register" className="btn btn-secondary">
              Join Us
            </Link>
          )}
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h3>🚚 Fast Delivery</h3>
          <p>Quick and reliable shipping to your doorstep</p>
        </div>

        <div className="feature">
          <h3>🔒 Secure Payments</h3>
          <p>Safe and secure checkout process</p>
        </div>

        <div className="feature">
          <h3>💳 Easy Returns</h3>
          <p>Hassle-free returns and exchanges</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
