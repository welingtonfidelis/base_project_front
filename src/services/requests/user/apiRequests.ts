import { LoggedUser, Profile } from "../../../domains/user";
import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import { LoginPayload, ResetPasswordPayload, UpdatePasswordPayload, UpdateProfilePayload } from "./types";

export const login = async (payload: LoginPayload) => {
  const { data: response } = await RestRequestService.post<LoggedUser>(EndPoints.LOGIN, payload);
  return response;
};

export const logout = async () => {
  const { data: response } = await RestRequestService.post<LoggedUser>(EndPoints.LOGOUT);
  return response;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data: response } = await RestRequestService.post<{}>(EndPoints.RESET_PASSWORD, payload);
  return response;
};

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const { data: response } = await RestRequestService.post<{}>(EndPoints.UPDATE_PASSWORD, payload);
  return response;
};

export const getProfile = async () => {
  const { data: response } = await RestRequestService.get<Profile>(EndPoints.PROFILE);
  return response;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { data: response } = await RestRequestService.patch<{}>(EndPoints.PROFILE, payload);
  return response;
};
