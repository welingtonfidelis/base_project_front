import { ApplicationPermissions } from "../../../shared/enum/applicationPermissions";

export const permissions = [
    {
        id: 1,
        name: 'Admin',
        value: ApplicationPermissions.ADMIN
    },
    {
        id: 2,
        name: 'Manager',
        value: ApplicationPermissions.MANAGER
    },
    {
        id: 3,
        name: 'User',
        value: ApplicationPermissions.USER
    },
]