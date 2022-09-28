import { AuthenticatedLayout } from "./components/layouts/authenticatedLayout";
import { GuestLayout } from "./components/layouts/guestLayout";
import { ApplicationPermissions } from "./config/applicationPermissions/intex";
import { ApplicationRoutes } from "./config/applicationRoutes";
import { Dashboard } from "./pages/dashBoard";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/resetPassword";

const { ROOT, RESET_PASSWORD, DASHBOARD } = ApplicationRoutes;
const { ADMIN, MANAGER, USER } = ApplicationPermissions;

export const useRoutes = () => {
  const routes = [
    {
      path: ROOT,
      element: Login,
      layout: GuestLayout,
      permissions: [],
    },
    {
      path: RESET_PASSWORD,
      element: ResetPassword,
      layout: GuestLayout,
      permissions: [],
    },
    {
      path: DASHBOARD,
      element: Dashboard,
      layout: AuthenticatedLayout,
      permissions: [ADMIN, MANAGER, USER],
    }
  ] 

  return { routes };
} 
