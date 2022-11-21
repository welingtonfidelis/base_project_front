import { User } from "../../../domains/user";

// Request
export interface LoginPayload {
  username: string;
  password: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface UpdateResetedPasswordPayload {
  new_password: string;
  token: string;
}

export interface ResetPasswordPayload {
  username: string;
  language: string;
}
export interface UpdateProfilePayload {
  name: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  username: string;
  is_blocked: boolean;
  permissions: string[];
}

export interface UpdateUserPayload {
  id: number;
  data: {
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    image_url?: string;
    image_key?: string;
    is_blocked?: boolean;
    permissions?: string[];
  }
}

export interface DeleteUserPayload {
  id: number;
}

export interface ListUsersPayload {
  page: number;
  filter_by_id?: string;
  filter_by_name?: string;
}

export interface GetUserByIdPayload {
  id?: number;
}

// Response
export interface LoggedUser {
  name: string;
  email: string;
  permissions: string[];
}

export interface ListUsersResponse {
  total: number;
  users: User[];
}

export interface GetProfileResponse extends User {}

export interface GetUserResponse extends User {}

export interface CreateUserResponse {
  password: string;
  username: string;
  email: string;
}