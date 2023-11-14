import React from 'react';
import PropTypes from 'prop-types';
import StyledTag from './styled/Tag';

function Tag({ type, text }) {
  const border = {
    primary: '1px dotted #141414',
    secondary: '1px dotted #ececec',
    danger: '1px dotted #7a0012',
    dicoding: '1px dotted #2d3e50',
  };

  const textColor = {
    primary: '#141414',
    secondary: '#ececec',
    danger: '#7a0012',
    dicoding: '#2d3e50',
  };
  return (
    <StyledTag $border={border[type]} $textColor={textColor[type]}>{text}</StyledTag>
  );
}

Tag.propTypes = {
  /** The text of the tag */
  text: PropTypes.string.isRequired,
  /** The type of the tag */
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'dicoding']).isRequired,
};

export default Tag;
