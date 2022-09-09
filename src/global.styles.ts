import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    margin: 0;
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
      background: ${props => props.theme.colors.background};
      max-width: ${props => props.theme.size.maxWidthPage};
      padding: 0.5rem;
      height: calc(100vh - 1rem);
      display: flex;
      margin: 0 auto;
      
      & #root {
        flex: 1;
      }
    }
`;
