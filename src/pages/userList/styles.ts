import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SearchInputContent = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const EditIconContent = styled.div`
  color: ${(props) => props.theme.colors.primary};
`;
