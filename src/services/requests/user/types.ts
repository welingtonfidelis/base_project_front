import { OmitCommonProps } from "@chakra-ui/react";
import { LoggedUser, User } from "../../../domains/user";
import { ResponseInterface } from "../types";

// Request
export interface LoginPayload {
  user_name: string;
  password: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ResetPasswordPayload {
  user_name: string;
}
export interface UpdateProfilePayload {
  name: string;
}

export interface ListUsersPayload {
  page: number;
}

// Response

export interface ListUsersResponse
  extends ResponseInterface<{
    total: number;
    users: User[];
  }> {}
