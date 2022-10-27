import { LoggedUser, Profile, User } from "../../../domains/user";
import { EndPoints } from "../../../shared/enum/endPoints";
import RestRequestService from "../api";
import {
  DeleteUserPayload,
  GetUserByIdPayload,
  ListUsersPayload,
  ListUsersResponse,
  LoginPayload,
  ResetPasswordPayload,
  UpdatePasswordPayload,
  UpdateProfilePayload,
  UpdateUserPayload,
} from "./types";

const {
  LOGIN,
  LOGOUT,
  PROFILE,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  LIST,
  GET,
  UPDATE,
  DELETE,
} = EndPoints.USERS;

export const login = async (payload: LoginPayload) => {
  const { data: response } = await RestRequestService.post<LoggedUser>(
    LOGIN,
    payload
  );
  return response;
};

export const logout = async () => {
  const { data: response } = await RestRequestService.post<{}>(LOGOUT);
  return response;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data: response } = await RestRequestService.post<{}>(
    RESET_PASSWORD,
    payload
  );
  return response;
};

export const updatePassword = async (payload: UpdatePasswordPayload) => {
  const { data: response } = await RestRequestService.post<{}>(
    UPDATE_PASSWORD,
    payload
  );
  return response;
};

export const getProfile = async () => {
  const { data: response } = await RestRequestService.get<Profile>(PROFILE);
  return response;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { data: response } = await RestRequestService.patch<{}>(
    PROFILE,
    payload
  );
  return response;
};

export const updateUser = async (payload: UpdateUserPayload) => {
  const { id, data } = payload;

  const { data: response } = await RestRequestService.patch<{}>(
    UPDATE.replace(":id", String(id)),
    data
  );
  return response;
};

export const deleteUser = async (params: DeleteUserPayload) => {
  const { id } = params;

  const { data: response } = await RestRequestService.delete<{}>(
    DELETE.replace(":id", String(id))
  );
  return response;
};

export const getUserList = async (params: ListUsersPayload) => {
  const { data: response } = await RestRequestService.get<ListUsersResponse>(
    LIST,
    { params }
  );
  return response;
};

export const getUserById = async (params: GetUserByIdPayload) => {
  const { id } = params;

  if (!id) return;;

  const { data: response } = await RestRequestService.get<User>(
    GET.replace(":id", String(id))
  );
  return response;
};
