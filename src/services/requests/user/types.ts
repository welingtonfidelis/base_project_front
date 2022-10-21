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
  email: string;
}
export interface UpdateProfilePayload
  extends OmitCommonProps<LoggedUser, "permissions"> {}

export interface ListUsersPayload {
  page: number;
}

// Response
export interface UpdateProfileResponse extends ResponseInterface<{}> {}

export interface UpdatePasswordResponse extends ResponseInterface<{}> {}

export interface ResetPasswordResponse extends ResponseInterface<{}> {}

export interface ListUsersResponse
  extends ResponseInterface<{
    total: number;
    users: User[];
  }> {}
