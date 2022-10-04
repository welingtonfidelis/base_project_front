import { AuthenticatedLayout } from "./components/layouts/authenticatedLayout";
import { GuestLayout } from "./components/layouts/guestLayout";
import { ApplicationPermissions } from "./shared/enum/applicationPermissions";
import { ApplicationRoutes } from "./shared/enum/applicationRoutes";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/resetPassword";
import { UserList } from "./pages/userList";

const { ROOT, RESET_PASSWORD, DASHBOARD, USER_LIST } = ApplicationRoutes;
const { ADMIN, MANAGER, USER } = ApplicationPermissions;

export const routes = [
  {
    label: 'pages.login.page_title',
    path: ROOT,
    element: Login,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: 'pages.reset_password.page_title',
    path: RESET_PASSWORD,
    element: ResetPassword,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: 'pages.dashboard.page_title',
    path: DASHBOARD,
    element: Dashboard,
    layout: AuthenticatedLayout,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: 'pages.user_list.page_title',
    path: USER_LIST,
    element: UserList,
    layout: AuthenticatedLayout,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER],
  },
];
