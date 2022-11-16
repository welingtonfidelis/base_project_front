import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";

const { LIST } = EndPoints.PERMISSIONS;

export const getPermissionList = async () => {
  const { data: response } = await RestRequestService.get<string[]>(LIST);
  return response;
};
