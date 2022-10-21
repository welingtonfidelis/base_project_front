import { ApplicationPermissions } from "../../../shared/enum/applicationPermissions";

const { ADMIN, MANAGER, USER } = ApplicationPermissions;

const usersA = [
  {
    id: 1,
    name: "Admin",
    email: "admin@email.com",
    user_name: "admin",
    password: "admin",
    is_blocked: false,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    id: 2,
    name: "Gerente",
    email: "gerente@email.com",
    user_name: "gerente",
    password: "gerente",
    is_blocked: false,
    permissions: [MANAGER, USER],
  },
];

const usersB = Array(50)
  .fill({})
  .map((_, index) => ({
    id: index + 3,
    name: `Usuario ${index}`,
    user_name: `usuario${index}`,
    password: `usuario${index}`,
    email: `usuario${index}@email.com`,
    is_blocked: index % 2 === 0,
    permissions: [USER],
  }));

export const users = [...usersA, ...usersB];