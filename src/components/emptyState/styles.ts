import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 8rem;
  }
`;

export const TextContent = styled.span`
  font-size: 1.2rem;
`;
