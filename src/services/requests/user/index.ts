import { useMutation } from "react-query";

import { login, resetPassword } from "./apiRequests";

export const useLogin = () => {  
  const { mutate, isLoading } = useMutation(login);
  
  return { login: mutate, isLoading };
}

export const useResetPassword = () => {  
  const { mutate, isLoading } = useMutation(resetPassword);
  
  return { resetPassword: mutate, isLoading };
}