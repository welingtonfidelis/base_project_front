import isArray from "lodash/isArray";

import { ApplicationPermissions } from "../../shared/enum/applicationPermissions";
import { userStore } from "../../store/user";

export const checkPermissionsService = () => {
  const { user } = userStore();

  const checkPermissions = (
    permissions: ApplicationPermissions | ApplicationPermissions[]
  ) => {
    const validatePermissions = isArray(permissions)
      ? permissions
      : [permissions];

    if (!validatePermissions.length) return true;

    return user.permissions.some((item) =>
      validatePermissions.includes(item as ApplicationPermissions)
    );
  };

  return { checkPermissions };
};
