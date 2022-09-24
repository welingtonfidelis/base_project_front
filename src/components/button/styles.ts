import styled from 'styled-components';

export const Container = styled.div`
  & button {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;