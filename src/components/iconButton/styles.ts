import styled from "styled-components";

export const Container = styled.div`
  & svg {
    font-size: 1.3rem;
    transition: 0.5s;

    :hover {
      cursor: pointer;
      filter: brightness(1.2);
    }
  }
`;
