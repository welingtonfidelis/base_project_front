import { LoggedUser } from "../../../domains/user";
import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import { LoginPayload, ResetPasswordPayload } from "./types";

export const login = async (payload: LoginPayload) => {
  const { data: response } = await RestRequestService.post<LoggedUser>(EndPoints.LOGIN, payload);
  return response;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data: response } = await RestRequestService.post<{}>(EndPoints.RESET_PASSWORD, payload);
  return response;
};
