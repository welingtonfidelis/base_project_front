import { ApplicationPermissions } from "../../../shared/enum/applicationPermissions";

const { ADMIN, MANAGER, USER } = ApplicationPermissions;

const usersA = [
  {
    id: 1,
    name: "Admin",
    email: "admin@email.com",
    username: "admin",
    password: "admin",
    image_url: '',
    image_key: '',
    is_blocked: false,
    permissions: [ADMIN, MANAGER, USER],
  },
  {
    id: 2,
    name: "Gerente",
    email: "gerente@email.com",
    username: "gerente",
    password: "gerente",
    image_url: '',
    image_key: '',
    is_blocked: false,
    permissions: [MANAGER, USER],
  },
];

const usersB = Array(50)
  .fill({})
  .map((_, index) => ({
    id: index + 3,
    name: `Usuario ${index}`,
    username: `usuario${index}`,
    password: `usuario${index}`,
    image_url: '',
    image_key: '',
    email: `usuario${index}@email.com`,
    is_blocked: index % 2 === 0,
    permissions: [USER],
  }));

export const users = [...usersA, ...usersB];