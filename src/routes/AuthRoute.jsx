import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthRoute({ children }) {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
