import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Button from './Button';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };
  return (
    <form className="login-input">
      <input type="text" value={email} onChange={onEmailChange} placeholder="Email" required />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" required />
      <Button onClick={handleLogin} text="Login" type="primary" />
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
