import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  & svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const IconBackContainer = styled.div`
  display: flex;
  align-items: center;

  /* & svg {
    font-size: 1.3rem;
    
    :hover {
      cursor: pointer;
      color: ${props => props.theme.colors.primary_hover};
      transition: all .5s;
    }
  } */
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.6rem;
  width: 100%;
  font-weight: 500;
  font-size: 17px;
`;
