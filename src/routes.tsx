import { BrowserRouter, Routes as RoutesRouter, Route } from "react-router-dom";
import { ApplicationRoutes } from "./config/applicationRoutes";

import { Login } from "./pages/login";
import { ResetPassword } from "./pages/resetPassword";

const { ROOT, RESET_PASSWORD } = ApplicationRoutes;

export const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesRouter>
        <Route path={ROOT} element={<Login />} />
        <Route path={RESET_PASSWORD} element={<ResetPassword />} />
      </RoutesRouter>
    </BrowserRouter>
  );
};
