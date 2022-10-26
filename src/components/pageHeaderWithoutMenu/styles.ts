import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  height: 3rem;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.35);
`;

export const IconBackContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: .5rem;

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
