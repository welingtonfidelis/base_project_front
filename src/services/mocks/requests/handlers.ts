import { permissionHandler } from "./handlers/permission";
import { userHandler } from "./handlers/user";

export const handlers = [
    ...userHandler,
    ...permissionHandler
]