import { useMutation, useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import {
  deleteUser,
  getProfile,
  getUserList,
  login,
  logout,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
} from "./apiRequests";
import { ListUsersPayload } from "./types";

const { PROFILE, GET } = EndPoints.USERS;

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
  const getQueryKey = () => [GET, params];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), () =>
    getUserList(params)
  );

  return { getQueryKey, refetch, data, isLoading };
};
