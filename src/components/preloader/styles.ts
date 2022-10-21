import styled from "styled-components";

export const SpinnecerContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div<{ isLoading: boolean }>`
  height: 100%;
  width: 100%;
  /* display: ${(props) => (props.isLoading ? "none" : "block")}; */
  filter: ${(props) => (props.isLoading ? "blur(1px)" : undefined)};
`;
