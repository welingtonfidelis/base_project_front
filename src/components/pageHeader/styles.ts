import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: .5rem;

  & svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  width: 100%;
  font-weight: 500;
  font-size: 17px;
`; 
