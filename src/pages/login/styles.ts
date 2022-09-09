import styled from "styled-components";

import imageBackground from "../../assets/background_1.jpg";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  background-image: url(${imageBackground});
  box-shadow: inset 0 0 0 1000px rgb(25 118 210 / 45%);
`;

export const Content = styled.div`
  height: 50vh;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.border.radius};
  background: #fff;

  @media (min-width: 800px) {
    width: 60%;
  }
`;
