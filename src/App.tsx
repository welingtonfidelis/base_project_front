import { Routes } from "./routes";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";

import i18n from "./config/18n";
import { GlobalStyles } from "./global.styles";
import { light } from "./config/styles/theme.styles";

export const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </I18nextProvider>
  );
};
