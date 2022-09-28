import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from 'react-toastify';

import { AppRouter } from "./AppRouter";
import i18n from "./config/18n";
import { GlobalStyles } from "./global.styles";
import { light } from "./config/styles/theme.styles";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <AppRouter />
        <ToastContainer autoClose={false}/>
      </ThemeProvider>
    </I18nextProvider>
  );
};
