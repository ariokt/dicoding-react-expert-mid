import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Button from './Button';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
  };

  return (
    <form className="register-input">
      <input type="text" value={name} onChange={onNameChange} placeholder="Name" />
      <input type="email" value={email} onChange={onEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <Button onClick={handleRegister} text="Register" type="primary" />
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
