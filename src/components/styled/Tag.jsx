import styled from 'styled-components';

const StyledTag = styled.div`
  padding: 4px 8px;
  border: ${(props) => props.$border};
  color: ${(props) => props.$textColor};
  border-radius: 8px;
  width: fit-content;
`;

StyledTag.defaultProps = {
  $border: '1px dotted #141414',
  $textColor: '#141414',
};

export default StyledTag;
