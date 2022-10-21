export interface LoggedUser {
  name: string;
  email: string;
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
