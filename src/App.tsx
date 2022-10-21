import { useLayoutEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

import { AppRouter } from "./AppRouter";
import { userStore } from "./store/user";
import i18n from "./config/18n";
import { Preloader } from "./components/preloader";
import { ApplicationStorage } from "./shared/enum/applicationStorage";
import { storage } from "./services/storage";
import { worker } from "./services/mocks/requests/browser";
import { config } from "./config";

import { GlobalStyles } from "./global.styles";
import { light } from "./config/styles/styled-component-theme";
import { theme } from "./config/styles/chackra-ui-theme";
import "react-toastify/dist/ReactToastify.css";

const { USER } = ApplicationStorage;

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { updateUser } = userStore();
  const { get } = storage();

  useLayoutEffect(() => {
    const userOnStorage = get(USER);
    if (userOnStorage) updateUser(userOnStorage);

    if (config.isMockEnable()) {
      worker.start({
        onUnhandledRequest(req: any) {
          // For debugger MSW mock handlers error
          console.warn('Found an unhandled request on MSW', req);
        },
      });
    }

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
