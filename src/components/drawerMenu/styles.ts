import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 16rem;
  padding: 0.5rem;
  z-index: 99;
  background: ${(props) => props.theme.colors.background};

  -webkit-box-shadow: 1px 0px 9px 1px rgba(0, 0, 0, 0.35);
  box-shadow: 1px 0px 9px 1px rgba(0, 0, 0, 0.35);

  & .mobile-icon-close-drawer {
    visibility: hidden;
  }

  @media (max-width: 600px) {
    position: absolute;
    left: -16rem;

    & .mobile-icon-close-drawer {
      visibility: visible;
    }
    ${css`
      &.slide-right {
        -webkit-animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          both;
        animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }

      &.slide-left {
        -webkit-animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          both;
        animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
    `}
  }
`;

export const LogoImageContent = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.separator};
  margin-bottom: .5rem;
  padding-bottom: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseMenuCotent = styled.div`
  display: flex;
  justify-content: flex-end;
  transition: 0.5s;

  & svg {
    :hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const UserName = styled.div`
  display: flex;
  align-items: center;

  & span {
    margin-right: 4px;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 16rem;
    font-size: 1.1rem;
  }
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100% - 89px);

  & span {
    margin: 2px 0;
  }
`;

export const DrawerMenuItem = styled.span<{ selected: boolean }>`
  background: ${(props) => (props.selected ? props.theme.colors.tertiary : "")};
  color: ${(props) => (props.selected ? "white" : "")};
  border-radius: 4px;
  padding: 8px;
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
