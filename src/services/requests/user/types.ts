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
  data: Partial<Omit<User, 'id'>>
}

export interface DeleteUserPayload {
  id: number;
}

export interface ListUsersPayload {
  page: number;
  id?: string;
  name?: string;
}

export interface GetUserByIdPayload {
  id?: number;
}

// Response
export interface ListUsersResponse {
  total: number;
  users: User[];
}

export interface CreateUserResponse {
  password: string;
  username: string;
  email: string;
}