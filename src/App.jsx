import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './routes/PrivateRoute';
import AuthRoute from './routes/AuthRoute';
import AddThreadPage from './pages/AddThreadPage';
import Leaderboards from './pages/Leaderboards';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/detail-thread/:id" element={<PrivateRoute><DetailPage /></PrivateRoute>} />
          <Route path="/add-thread" element={<PrivateRoute><AddThreadPage /></PrivateRoute>} />
          <Route path="/leaderboards" element={<PrivateRoute><Leaderboards /></PrivateRoute>} />
          <Route path="*" element={<div>404 Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
