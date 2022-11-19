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