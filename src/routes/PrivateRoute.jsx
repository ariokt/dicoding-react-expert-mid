import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
      <div className="app-container">
        {children}
      </div>
      <Footer />
    </>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
