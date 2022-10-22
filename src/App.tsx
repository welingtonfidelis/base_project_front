import { useLayoutEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import { AppRouter } from "./AppRouter";
import { userStore } from "./store/user";
import i18n from "./config/18n";
import { Preloader } from "./components/preloader";
import { worker } from "./services/mocks/requests/browser";
import { config } from "./config";

import { GlobalStyles } from "./global.styles";
import { light } from "./config/styles/styled-component-theme";
import { theme } from "./config/styles/chackra-ui-theme";
import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "./services/requests/user/apiRequests";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = new QueryClient();
  const { updateUser } = userStore();

  const getUserProfile = async () => {
    try {
      const data = await getProfile();

      if (data) updateUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (config.IS_MOCK_ENABLE) {
      worker.start({
        onUnhandledRequest(req: any) {
          // For debugger MSW mock handlers error
          console.warn("Found an unhandled request on MSW", req);
        },
      });
    }

    getUserProfile();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={light}>
          <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <Preloader isLoading={isLoading}>
              <AppRouter />
            </Preloader>
            <ToastContainer autoClose={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ChakraProvider>
  );
};
