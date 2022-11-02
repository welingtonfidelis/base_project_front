import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & button {
    margin-top: 1rem;
    width: 100%;
  }

  & span {
    font-size: 1.7rem;
    font-weight: 500;
  }
`;

export const ImageContent = styled.div`
  background: url("balloon_background.png");
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 32rem;
  background-position: center;
  height: 20rem;

  & img {
    width: 16rem;
  }
`;
