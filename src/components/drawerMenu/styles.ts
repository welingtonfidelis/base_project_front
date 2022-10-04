import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 10rem;
  padding: 0.5rem;

  -webkit-box-shadow: 1px 0px 9px 1px rgba(0, 0, 0, 0.35);
  box-shadow: 1px 0px 9px 1px rgba(0, 0, 0, 0.35);

  @media (max-width: 600px) {
    position: absolute;
  }
`;

export const AvatarContent = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.separator};
  margin-bottom: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  display: flex;
  align-items: center;

  & span {
    margin-right: 4px;
  }
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100% - 89px);

  & span {
    margin: 4px 0;
  }
`;

export const DrawerMenuItem = styled.span<{ selected: boolean }>`
  background: ${(props) => (props.selected ? props.theme.colors.tertiary : "")};
  color: ${(props) => (props.selected ? "white" : "")};
  border-radius: 4px;
  padding: 4px;
  transition: 0.5s;

  &:hover {
    ${(props) => {
      if (!props.selected) {
        return css`
          cursor: pointer;
          color: ${(props) => props.theme.colors.primary};
          box-shadow: inset 0 0 0 1000px rgb(25 118 210 / 15%);
        `;
      }
    }}
  }
`;
