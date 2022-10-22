import { useMutation, useQuery } from "react-query";
import { EndPoints } from "../../../shared/enum/endPoints";

import { getProfile, login, logout, resetPassword, updateProfile } from "./apiRequests";

const { PROFILE } = EndPoints;

// ===== MUTATES ===== //
export const useLogin = () => {  
  const { mutate, isLoading } = useMutation(login);
  
  return { login: mutate, isLoading };
}

export const useLogout = () => {  
  const { mutate, isLoading } = useMutation(logout);
  
  return { logout: mutate, isLoading };
}

export const useResetPassword = () => {  
  const { mutate, isLoading } = useMutation(resetPassword);
  
  return { resetPassword: mutate, isLoading };
}

export const useUpdateProfile = () => {  
  const { mutate, isLoading } = useMutation(updateProfile);
  
  return { updateProfile: mutate, isLoading };
}

// ===== QUERIES ===== //
export const useGetProfile = () => {
  const getQueryKey = () => [PROFILE];

  const { data, refetch, isLoading } = useQuery(getQueryKey(), getProfile);

  return { getQueryKey, refetch, data, isLoading };
}