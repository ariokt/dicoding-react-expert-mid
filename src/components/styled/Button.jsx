import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 12px 8px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  border: 0;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
`;

StyledButton.defaultProps = {
  $backgroundColor: '#141414',
  $textColor: '#fff',
};

export default StyledButton;
