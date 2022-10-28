import { ApplicationPermissions } from "../shared/enum/applicationPermissions";

export interface Permission {
    id: number;
    name: string;
    value: ApplicationPermissions;
}