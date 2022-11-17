import styled from "styled-components";

export const BordedContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.separator};
  border-radius: 6px;
  padding: 8px 1rem;
`;
