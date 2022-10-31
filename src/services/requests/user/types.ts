import { User } from "../../../domains/user";

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

export interface CreateUserPayload extends Omit<User, 'id'>{}

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
  user_name: string;
  email: string;
}