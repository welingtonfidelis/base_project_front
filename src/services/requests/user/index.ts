import { useMutation, useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import {
  createUser,
  deleteUser,
  getProfile,
  getUserById,
  getUserList,
  login,
  logout,
  resetPassword,
  updatePassword,
  updateProfile,
  updateResetedPassword,
  updateUser,
} from "./apiRequests";
import { GetUserByIdPayload, ListUsersPayload } from "./types";

const { PROFILE, LIST, GET } = EndPoints.USERS;

// ===== MUTATES ===== //
export const useLogin = () => {
  const { mutate, isLoading } = useMutation(login);

  return { login: mutate, isLoading };
};

export const useLogout = () => {
  const { mutate, isLoading } = useMutation(logout);

  return { logout: mutate, isLoading };
};

export const useResetPassword = () => {
  const { mutate, isLoading } = useMutation(resetPassword);

  return { resetPassword: mutate, isLoading };
};

export const useUpdatePassword = () => {
  const { mutate, isLoading } = useMutation(updatePassword);

  return { updatePassword: mutate, isLoading };
};

export const useUpdateResetedPassword = () => {
  const { mutate, isLoading } = useMutation(updateResetedPassword);

  return { updateResetedPassword: mutate, isLoading };
};

export const useUpdateProfile = () => {
  const { mutate, isLoading } = useMutation(updateProfile);

  return { updateProfile: mutate, isLoading };
};

export const useCreateUser = () => {
  const { mutate, isLoading } = useMutation(createUser);

  return { createUser: mutate, isLoading };
};

export const useUpdateUser = () => {
  const { mutate, isLoading } = useMutation(updateUser);

  return { updateUser: mutate, isLoading };
};

export const useDeleteUser = () => {
  const { mutate, isLoading } = useMutation(deleteUser);

  return { deleteUser: mutate, isLoading };
};

// ===== QUERIES ===== //
export const useGetProfile = () => {
  const getQueryKey = () => [PROFILE];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), getProfile);
  
  if(data && data.image_url.length) data.image_url += `?${new Date().getTime()}`;

  return { getQueryKey, refetch, data, isLoading };
};

export const useGetListUsers = (params: ListUsersPayload) => {
  if (!params.filter_by_id) delete params.filter_by_id;
  if (!params.filter_by_name) delete params.filter_by_name;

  const getQueryKey = () => [LIST, params];

  const { data, refetch, isLoading, error } = useQuery(getQueryKey(), () =>
    getUserList(params)
  );

  return { getQueryKey, refetch, data, isLoading, error };
};

export const useGetUserById = (params: GetUserByIdPayload) => {
  const getQueryKey = () => [GET, params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    getUserById(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};
