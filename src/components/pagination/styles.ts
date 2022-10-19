import styled from "styled-components";

export const Container = styled.div<{hasContent: boolean}>`
  display: flex;
  justify-content: center;
  padding-top: ${props => props.hasContent ? '.5rem' : ''};
  margin-top: ${props => props.hasContent ? '.25rem' : ''};
  box-shadow: 1px 0px 9px -4px rgba(0, 0, 0, 0.35);

  & .rpb-item--active {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
