import { useMutation } from "react-query";

import { loginPost } from "./apiRequests";

export const useLogin = () => {
  console.log(import.meta.env.VITE_REST_API_URL);
  
  const { mutate, isLoading } = useMutation(loginPost);
  
  return { login: mutate, isLoading };
}