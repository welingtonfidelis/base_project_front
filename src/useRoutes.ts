import { ApplicationPermissions } from "./config/applicationPermissions/intex";
import { ApplicationRoutes } from "./config/applicationRoutes";
import { DashBoard } from "./pages/dashBoard";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/resetPassword";

const { ROOT, RESET_PASSWORD, DASH_BOARD } = ApplicationRoutes;
const { ADMIN, MANAGER, USER } = ApplicationPermissions;

export const useRoutes = () => {
  const routes = [
    {
      path: ROOT,
      element: Login,
      permissions: []
    },
    {
      path: RESET_PASSWORD,
      element: ResetPassword,
      permissions: []
    },
    {
      path: DASH_BOARD,
      element: DashBoard,
      permissions: [ADMIN, MANAGER, USER]
    }
  ] 

  return { routes };
} 
