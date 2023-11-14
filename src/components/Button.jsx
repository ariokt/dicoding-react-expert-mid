import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './styled/Button';

function Button({ onClick, text, type }) {
  const backgroundColor = {
    primary: '#141414',
    secondary: '#ececec',
    danger: '#7a0012',
    dicoding: '#2d3e50',
  };

  const textColor = {
    primary: '#fff',
    secondary: '#141414',
    danger: '#fff',
    dicoding: '#fff',
  };

  return (
    <StyledButton
      onClick={onClick}
      $backgroundColor={backgroundColor[type]}
      $textColor={textColor[type]}
    >
      {text}
    </StyledButton>
  );
}

Button.propTypes = {
  /** The function of the button */
  onClick: PropTypes.func.isRequired,
  /** The text of the button */
  text: PropTypes.string.isRequired,
  /** The type of the button */
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'dicoding']).isRequired,
};

export default Button;
