import { LoggedUser, Profile, User } from "../../../domains/user";
import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import {
  DeleteUserPayload,
  ListUsersPayload,
  ListUsersResponse,
  LoginPayload,
  ResetPasswordPayload,
  UpdatePasswordPayload,
  UpdateProfilePayload,
  UpdateUserPayload,
} from "./types";

export const login = async (payload: LoginPayload) => {
  const { data: response } = await RestRequestService.post<LoggedUser>(
    EndPoints.USERS.LOGIN,
    payload
  );
  return response;
};

export const logout = async () => {
  const { data: response } = await RestRequestService.post<{}>(
    EndPoints.USERS.LOGOUT
  );
  return response;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data: response } = await RestRequestService.post<{}>(
    EndPoints.USERS.RESET_PASSWORD,
    payload
  );
  return response;
};

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const { data: response } = await RestRequestService.post<{}>(
    EndPoints.USERS.UPDATE_PASSWORD,
    payload
  );
  return response;
};

export const getProfile = async () => {
  const { data: response } = await RestRequestService.get<Profile>(
    EndPoints.USERS.PROFILE
  );
  return response;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { data: response } = await RestRequestService.patch<{}>(
    EndPoints.USERS.PROFILE,
    payload
  );
  return response;
};

export const updateUser = async (payload: UpdateUserPayload) => {
  const { id, data } = payload;

  const { data: response } = await RestRequestService.patch<{}>(
    EndPoints.USERS.UPDATE.replace(':id', String(id)),
    data
  );
  return response;
};

export const deleteUser = async (params: DeleteUserPayload) => {
  const { id } = params;

  const { data: response } = await RestRequestService.delete<{}>(
    EndPoints.USERS.DELETE.replace(':id', String(id))
  );
  return response;
};

export const getUserList = async (params: ListUsersPayload) => {
  const { data: response } = await RestRequestService.get<ListUsersResponse>(
    EndPoints.USERS.GET,
    { params }
  );
  return response;
};
