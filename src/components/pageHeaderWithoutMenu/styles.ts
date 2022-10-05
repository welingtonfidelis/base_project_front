import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  height: 2.2rem;
`;

export const IconBackContainer = styled.div`
  display: flex;
  align-items: center;

  & svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const TitleContainer = styled.div`
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.6rem;
  width: 100%;
  font-weight: 500;
  font-size: 17px;
`;
