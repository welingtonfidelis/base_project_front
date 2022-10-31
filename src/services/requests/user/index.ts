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

  return { getQueryKey, refetch, data, isLoading };
};

export const useGetListUsers = (params: ListUsersPayload) => {
  const getQueryKey = () => [LIST, params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    getUserList(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};

export const useGetUserById = (params: GetUserByIdPayload) => {
  const getQueryKey = () => [GET, params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    getUserById(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};
