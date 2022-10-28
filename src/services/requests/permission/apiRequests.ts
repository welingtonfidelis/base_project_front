import { Permission } from "../../../domains/permission";
import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";

const { LIST } = EndPoints.PERMISSIONS;

export const getPermissionList = async () => {
  const { data: response } = await RestRequestService.get<Permission[]>(LIST);
  return response;
};
