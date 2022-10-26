import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${(props) => props.theme.colors.primary};
`;

export const IconBackContainer = styled.div`
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

export const TitleContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.6rem;
  margin-left: 1.6rem;
  width: 100%;
  font-weight: 500;
  font-size: 17px;
`;
