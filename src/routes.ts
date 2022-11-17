import { LayoutWithDrawerMenu } from "./components/layouts/layoutWithDrawerMenu";
import { GuestLayout } from "./components/layouts/guestLayout";
import { ApplicationPermissions } from "./shared/enum/applicationPermissions";
import { ApplicationRoutes } from "./shared/enum/applicationRoutes";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { ResetPassword } from "./pages/resetPassword";
import { UserList } from "./pages/userList";
import { NotFound } from "./pages/notFound";
import { UserDetail } from "./pages/userDetail";
import { UpdateResetedPassword } from "./pages/updateResetedPassword";

const { ROOT, RESET_PASSWORD, UPDATE_RESETED_PASSWORD, DASHBOARD, USER_LIST, USER_EDIT, USER_NEW } =
  ApplicationRoutes;
const { ADMIN, MANAGER, USER } = ApplicationPermissions;

export const routes = [
  {
    label: "pages.login.page_title",
    path: ROOT,
    element: Login,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "pages.reset_password.page_title",
    path: RESET_PASSWORD,
    element: ResetPassword,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "pages.update_reseted_password.page_title",
    path: UPDATE_RESETED_PASSWORD,
    element: UpdateResetedPassword,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
  {
    label: "pages.dashboard.page_title",
    path: DASHBOARD,
    element: Dashboard,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    label: "pages.user_list.page_title",
    path: USER_LIST,
    element: UserList,
    layout: LayoutWithDrawerMenu,
    isMenuOption: true,
    permissions: [ADMIN, MANAGER],
  },
  {
    label: "pages.user.page_new_title",
    path: USER_NEW,
    element: UserDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER],
  },
  {
    label: "pages.user.page_new_title",
    path: USER_EDIT,
    element: UserDetail,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [ADMIN, MANAGER],
  },
  {
    label: "not found",
    path: "*",
    element: NotFound,
    layout: GuestLayout,
    isMenuOption: false,
    permissions: [],
  },
];
