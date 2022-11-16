export interface LoggedUser {
  name: string;
  email: string;
  permissions: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  image_url: string;
  image_key: string;
  is_blocked: boolean;
  permissions: string[];
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  username: string;
  image_url: string;
  image_key: string;
  created_at: string;
  permissions: string[];
}
