export interface LoggedUser {
  name: string;
  permissions: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  user_name: string;
  is_blocked: boolean;
  permissions: string[];
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  user_name: string;
  permissions: string[];
}