import { useLayoutEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

import { AppRouter } from "./AppRouter";
import { userStore } from "./store/user";
import i18n from "./config/18n";
import { GlobalStyles } from "./global.styles";
import { light } from "./config/styles/styled-component-theme";
import { theme } from "./config/styles/chackra-ui-theme";
import "react-toastify/dist/ReactToastify.css";
import { Preloader } from "./components/preloader";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { updateUser } = userStore();

  useLayoutEffect(() => {
    const userOnLocalStorage = localStorage.getItem("user");
    if (userOnLocalStorage) updateUser(JSON.parse(userOnLocalStorage));

    setIsLoading(false);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={light}>
          <GlobalStyles />
          <Preloader isLoading={isLoading}>
            <AppRouter />
          </Preloader>
          <ToastContainer autoClose={false} />
        </ThemeProvider>
      </I18nextProvider>
    </ChakraProvider>
  );
};
