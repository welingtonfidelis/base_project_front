import { LoggedUser } from "../../../domains/user";
import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import { LoginPayload } from "./types";

export const loginPost = async (payload: LoginPayload) => {
  const { data: response } = await RestRequestService.post<LoggedUser>(EndPoints.LOGIN, payload);
  return response;
};
