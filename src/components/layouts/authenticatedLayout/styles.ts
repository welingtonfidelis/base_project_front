import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.div`
  flex: 1;
  margin: 0 0.5rem 0.5rem 0.5rem;
  height: calc(100% - 64px);
  width: calc(100% - 16px);
`;