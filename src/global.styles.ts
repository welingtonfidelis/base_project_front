import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    box-sizing: border-box;
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    background: ${(props) => props.theme.colors.background};
    /* max-width: ${(props) => props.theme.size.maxWidthPage}; */
    height: 100vh;
    display: flex;
    margin: auto;
    box-sizing: inherit;
    margin: auto;

    & #root {
      flex: 1;
    }
  }
`;
