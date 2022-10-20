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
  
  & .mobile-icon-open-drawer {
      visibility: hidden;
    }

  @media (max-width: 600px) {
    & .mobile-icon-open-drawer {
      visibility: visible;
    }
  }
`;

export const Main = styled.div`
  flex: 1;
  margin: 0 0.5rem 0.5rem 0.5rem;
  height: calc(100vh - 4rem);
  width: calc(100vw - 17rem);

  @media (max-width: 600px) {
    width: calc(100vw - 1rem);
  }
`;